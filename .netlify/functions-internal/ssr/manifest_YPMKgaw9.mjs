import './chunks/astro_ueF1Yx1r.mjs';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

/**
 * Tokenize input string.
 */
function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
        var char = str[i];
        if (char === "*" || char === "+" || char === "?") {
            tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
            continue;
        }
        if (char === "\\") {
            tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
            continue;
        }
        if (char === "{") {
            tokens.push({ type: "OPEN", index: i, value: str[i++] });
            continue;
        }
        if (char === "}") {
            tokens.push({ type: "CLOSE", index: i, value: str[i++] });
            continue;
        }
        if (char === ":") {
            var name = "";
            var j = i + 1;
            while (j < str.length) {
                var code = str.charCodeAt(j);
                if (
                // `0-9`
                (code >= 48 && code <= 57) ||
                    // `A-Z`
                    (code >= 65 && code <= 90) ||
                    // `a-z`
                    (code >= 97 && code <= 122) ||
                    // `_`
                    code === 95) {
                    name += str[j++];
                    continue;
                }
                break;
            }
            if (!name)
                throw new TypeError("Missing parameter name at ".concat(i));
            tokens.push({ type: "NAME", index: i, value: name });
            i = j;
            continue;
        }
        if (char === "(") {
            var count = 1;
            var pattern = "";
            var j = i + 1;
            if (str[j] === "?") {
                throw new TypeError("Pattern cannot start with \"?\" at ".concat(j));
            }
            while (j < str.length) {
                if (str[j] === "\\") {
                    pattern += str[j++] + str[j++];
                    continue;
                }
                if (str[j] === ")") {
                    count--;
                    if (count === 0) {
                        j++;
                        break;
                    }
                }
                else if (str[j] === "(") {
                    count++;
                    if (str[j + 1] !== "?") {
                        throw new TypeError("Capturing groups are not allowed at ".concat(j));
                    }
                }
                pattern += str[j++];
            }
            if (count)
                throw new TypeError("Unbalanced pattern at ".concat(i));
            if (!pattern)
                throw new TypeError("Missing pattern at ".concat(i));
            tokens.push({ type: "PATTERN", index: i, value: pattern });
            i = j;
            continue;
        }
        tokens.push({ type: "CHAR", index: i, value: str[i++] });
    }
    tokens.push({ type: "END", index: i, value: "" });
    return tokens;
}
/**
 * Parse a string for the raw tokens.
 */
function parse(str, options) {
    if (options === void 0) { options = {}; }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^".concat(escapeString(options.delimiter || "/#?"), "]+?");
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function (type) {
        if (i < tokens.length && tokens[i].type === type)
            return tokens[i++].value;
    };
    var mustConsume = function (type) {
        var value = tryConsume(type);
        if (value !== undefined)
            return value;
        var _a = tokens[i], nextType = _a.type, index = _a.index;
        throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
    };
    var consumeText = function () {
        var result = "";
        var value;
        while ((value = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR"))) {
            result += value;
        }
        return result;
    };
    while (i < tokens.length) {
        var char = tryConsume("CHAR");
        var name = tryConsume("NAME");
        var pattern = tryConsume("PATTERN");
        if (name || pattern) {
            var prefix = char || "";
            if (prefixes.indexOf(prefix) === -1) {
                path += prefix;
                prefix = "";
            }
            if (path) {
                result.push(path);
                path = "";
            }
            result.push({
                name: name || key++,
                prefix: prefix,
                suffix: "",
                pattern: pattern || defaultPattern,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        var value = char || tryConsume("ESCAPED_CHAR");
        if (value) {
            path += value;
            continue;
        }
        if (path) {
            result.push(path);
            path = "";
        }
        var open = tryConsume("OPEN");
        if (open) {
            var prefix = consumeText();
            var name_1 = tryConsume("NAME") || "";
            var pattern_1 = tryConsume("PATTERN") || "";
            var suffix = consumeText();
            mustConsume("CLOSE");
            result.push({
                name: name_1 || (pattern_1 ? key++ : ""),
                pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
                prefix: prefix,
                suffix: suffix,
                modifier: tryConsume("MODIFIER") || "",
            });
            continue;
        }
        mustConsume("END");
    }
    return result;
}
/**
 * Compile a string to a template function for the path.
 */
function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
}
/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction(tokens, options) {
    if (options === void 0) { options = {}; }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function (x) { return x; } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    // Compile all the tokens into regexps.
    var matches = tokens.map(function (token) {
        if (typeof token === "object") {
            return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
        }
    });
    return function (data) {
        var path = "";
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (typeof token === "string") {
                path += token;
                continue;
            }
            var value = data ? data[token.name] : undefined;
            var optional = token.modifier === "?" || token.modifier === "*";
            var repeat = token.modifier === "*" || token.modifier === "+";
            if (Array.isArray(value)) {
                if (!repeat) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to not repeat, but got an array"));
                }
                if (value.length === 0) {
                    if (optional)
                        continue;
                    throw new TypeError("Expected \"".concat(token.name, "\" to not be empty"));
                }
                for (var j = 0; j < value.length; j++) {
                    var segment = encode(value[j], token);
                    if (validate && !matches[i].test(segment)) {
                        throw new TypeError("Expected all \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                    }
                    path += token.prefix + segment + token.suffix;
                }
                continue;
            }
            if (typeof value === "string" || typeof value === "number") {
                var segment = encode(String(value), token);
                if (validate && !matches[i].test(segment)) {
                    throw new TypeError("Expected \"".concat(token.name, "\" to match \"").concat(token.pattern, "\", but got \"").concat(segment, "\""));
                }
                path += token.prefix + segment + token.suffix;
                continue;
            }
            if (optional)
                continue;
            var typeOfMessage = repeat ? "an array" : "a string";
            throw new TypeError("Expected \"".concat(token.name, "\" to be ").concat(typeOfMessage));
        }
        return path;
    };
}
/**
 * Escape a regular expression string.
 */
function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
/**
 * Get the flags for a regexp from the options.
 */
function flags(options) {
    return options && options.sensitive ? "" : "i";
}

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    })
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.0.4_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.AarTxVl4.js"}],"styles":[{"type":"external","src":"/_astro/about.Pz2c-M3k.css"},{"type":"inline","content":"a[data-astro-cid-vnzlvqnm]{padding:8px 14px;color:var(--blue-100);border-radius:4px;border:2px solid var(--blue-600);max-width:max-content;display:flex;align-items:center;gap:.5rem}a[data-astro-cid-vnzlvqnm]:hover{box-shadow:1px 0 3px #0037ff}\nsection[data-astro-cid-j7pv25f6]{width:100%}article[data-astro-cid-j7pv25f6]{display:flex;flex-direction:column;gap:1.5rem;width:60%}.intro-welcome[data-astro-cid-j7pv25f6]{font-size:1rem}.intro[data-astro-cid-j7pv25f6]{font-size:2.25rem;color:#9292a5}h1[data-astro-cid-j7pv25f6]{font-size:3.75rem;display:flex;flex-direction:column;gap:.25rem}@media (max-width: 868px){section[data-astro-cid-j7pv25f6]{flex-direction:column-reverse}h1[data-astro-cid-j7pv25f6]{font-size:3rem}.intro[data-astro-cid-j7pv25f6]{font-size:1.5rem}article[data-astro-cid-j7pv25f6]{width:100%}}\n"}],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.AarTxVl4.js"}],"styles":[{"type":"external","src":"/_astro/about.Pz2c-M3k.css"},{"type":"inline","content":"form{display:flex;flex-direction:column;align-items:flex-end;gap:1.3rem;width:600px;max-width:100%}input,textarea{background:#0b0c1caa;width:100%;border:2px solid #455168c9;padding:6px 10px;border-radius:4px;color:var(--blue-100);outline:0}input::placeholder,textarea::placeholder{color:#868686}input:focus,textarea:focus{border-color:#0b0c1c00;outline-width:1.7px;outline-color:#0c49ffe1;outline-style:solid}.responsive__inputs{display:flex;gap:1.3rem;width:100%}.submit__buttom{max-width:max-content;padding:8px 12px;background:#0000;color:var(--blue-100);border:solid 2px var(--blue-600);font-weight:600;cursor:pointer;border-radius:3px;display:flex;align-items:center;gap:.5rem}.load{width:17.45px;height:17.45px}.submit__buttom.active .svg-icon{animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(-360deg)}}@media (max-width: 868px){.responsive__inputs{flex-direction:column}form{width:100%}}h1[data-astro-cid-qwfq4wri]{margin-bottom:2rem}p[data-astro-cid-qwfq4wri]{margin-bottom:4rem;max-width:600px}section[data-astro-cid-qwfq4wri]{width:100%}.contact__info[data-astro-cid-qwfq4wri]{display:flex;justify-content:space-between;gap:3rem}.message-here[data-astro-cid-qwfq4wri]{display:flex;flex-direction:column;gap:1rem}ul[data-astro-cid-qwfq4wri]{display:flex;flex-direction:column;gap:.25rem}li[data-astro-cid-qwfq4wri]{display:flex;align-items:center;gap:.5rem}.contact-form[data-astro-cid-qwfq4wri]{display:flex;gap:2rem;flex-wrap:wrap;justify-content:space-between}@media (max-width: 868px){h1[data-astro-cid-qwfq4wri]{margin-bottom:1rem}p[data-astro-cid-qwfq4wri]{width:100%;margin-bottom:2rem}}\n"}],"routeData":{"route":"/contacts","type":"page","pattern":"^\\/contacts\\/?$","segments":[[{"content":"contacts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacts.astro","pathname":"/contacts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.AarTxVl4.js"}],"styles":[{"type":"external","src":"/_astro/about.Pz2c-M3k.css"},{"type":"inline","content":".project-card[data-astro-cid-mspuyifq]{position:relative}.project-card[data-astro-cid-mspuyifq]:nth-child(2n) .card[data-astro-cid-mspuyifq]{flex-direction:row-reverse}.card[data-astro-cid-mspuyifq]{display:flex;gap:5rem;background:#ffffff0d;padding:25px;border-radius:10px;overflow:hidden;align-items:center;&:nth-child(2n){flex-direction:row-reverse}}.project-year[data-astro-cid-mspuyifq]{position:absolute;left:-50px;top:50px;transform:rotate(270deg);font-size:20px;color:#a7adb2}h2[data-astro-cid-mspuyifq]{color:var(--blue-600);font-size:32px;margin:0 0 1rem;display:flex;align-items:center;justify-content:space-between}.open-source[data-astro-cid-mspuyifq]{display:flex;gap:1rem;font-size:13px;color:#00ffd0;border:1px solid rgb(0,255,208);padding:2px 12px;border-radius:4px}.tags[data-astro-cid-mspuyifq]{margin-top:2rem;display:flex;gap:1rem;flex-wrap:wrap;align-items:center}.tags[data-astro-cid-mspuyifq] img[data-astro-cid-mspuyifq]{width:30px}.buttons-links[data-astro-cid-mspuyifq]{margin-top:2rem;color:#00f}.image[data-astro-cid-mspuyifq]{filter:drop-shadow(0 0 3rem rgba(21,177,255,.35));border-radius:6px;align-self:center;flex:1;width:500px;max-width:100%;padding:25px}@media screen and (max-width: 1360px){.project-year[data-astro-cid-mspuyifq]{font-size:var(--font-size-xl);left:-32px}}@media screen and (max-width: 1200px){.image[data-astro-cid-mspuyifq]{width:350px;padding:15px 0}}@media screen and (max-width: 980px){.project-card[data-astro-cid-mspuyifq]:nth-child(2n) .card[data-astro-cid-mspuyifq]{flex-direction:column}.card[data-astro-cid-mspuyifq]{gap:1.5rem;margin:0 -25px;border-radius:0;flex-direction:column}.image[data-astro-cid-mspuyifq]{max-width:100%;align-self:flex-start;width:500px}.project-year[data-astro-cid-mspuyifq]{transform:rotate(0);top:3px;left:unset;right:-20px}}header[data-astro-cid-aid3sr62]{display:flex;flex-direction:column;gap:1rem}section[data-astro-cid-aid3sr62]{width:100%;padding:2rem 0;display:flex;flex-wrap:wrap;gap:3rem;row-gap:3rem}p[data-astro-cid-aid3sr62]{margin-bottom:1rem}header[data-astro-cid-aid3sr62]{color:var(--blue-100)}\na[data-astro-cid-vnzlvqnm]{padding:8px 14px;color:var(--blue-100);border-radius:4px;border:2px solid var(--blue-600);max-width:max-content;display:flex;align-items:center;gap:.5rem}a[data-astro-cid-vnzlvqnm]:hover{box-shadow:1px 0 3px #0037ff}\n"}],"routeData":{"route":"/projects","type":"page","pattern":"^\\/projects\\/?$","segments":[[{"content":"projects","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/projects.astro","pathname":"/projects","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.gOoBcOiX.js"}],"styles":[{"type":"external","src":"/_astro/about.Pz2c-M3k.css"},{"type":"inline","content":"div[data-astro-cid-53c6nxvk]{position:relative;border-radius:3px;padding:4px 8px;background:#3f3f605c}div[data-astro-cid-53c6nxvk]:before{content:\"\";position:absolute;inset:0;background:inherit;filter:blur(80px);z-index:-1}header[data-astro-cid-kh7btl4r]{display:flex;flex-direction:column;gap:2rem}h1[data-astro-cid-kh7btl4r]{color:var(--blue-600)}h2[data-astro-cid-kh7btl4r]{font-size:18px;font-weight:500}.skills-h2[data-astro-cid-kh7btl4r]{font-size:22px;font-weight:600}article[data-astro-cid-kh7btl4r]{width:100%;margin-top:3rem}.section-text[data-astro-cid-kh7btl4r]{max-width:600px;display:flex;flex-direction:column;gap:2rem}.skills[data-astro-cid-kh7btl4r]{font-size:1rem;margin-top:1.25rem;color:#bbb6cf;display:flex;gap:1rem;flex-wrap:wrap}@media (max-width: 868px){article[data-astro-cid-kh7btl4r]{flex-direction:column;gap:3rem}.section-text[data-astro-cid-kh7btl4r]{width:100%;margin-top:2rem}}\n"}],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sendemail.json","type":"endpoint","pattern":"^\\/api\\/sendEmail\\.json$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sendEmail.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sendEmail.json.ts","pathname":"/api/sendEmail.json","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/mnt/sda2/Portafolio (copia)/src/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["/mnt/sda2/Portafolio (copia)/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["/mnt/sda2/Portafolio (copia)/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/mnt/sda2/Portafolio (copia)/src/pages/contacts.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/contacts@_@astro",{"propagation":"in-tree","containsHead":false}],["/mnt/sda2/Portafolio (copia)/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/mnt/sda2/Portafolio (copia)/src/pages/projects.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/projects@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,s)=>{let n=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),n();break}});for(let e of s.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/src/pages/contacts.astro":"chunks/pages/contacts_CPP2G8bt.mjs","/node_modules/.pnpm/astro@4.0.4_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic.js":"chunks/pages/generic_XEgiuurK.mjs","/src/pages/projects.astro":"chunks/pages/projects_zDkt-g2f.mjs","/src/pages/api/sendEmail.json.ts":"chunks/pages/sendEmail_K5wka6Hv.mjs","\u0000@astrojs-manifest":"manifest_YPMKgaw9.mjs","/mnt/sda2/Portafolio (copia)/node_modules/.pnpm/@astrojs+react@3.0.9_@types+react-dom@18.2.18_@types+react@18.2.47_react-dom@18.2.0_react@18.2.0_vite@5.0.8/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_7a5sIVmK.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.0.4_typescript@5.2.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"chunks/generic_srXJTd9N.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_xd7QG0m8.mjs","\u0000@astro-page:src/pages/contacts@_@astro":"chunks/contacts_rGGV7Vj8.mjs","\u0000@astro-page:src/pages/projects@_@astro":"chunks/projects_A_w8w7TN.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_MACuvSJv.mjs","\u0000@astro-page:src/pages/api/sendEmail.json@_@ts":"chunks/sendEmail_WzwxpwVM.mjs","/astro/hoisted.js?q=0":"_astro/hoisted.gOoBcOiX.js","/mnt/sda2/Portafolio (copia)/src/components/Form.jsx":"_astro/Form.LSHZcHGQ.js","/astro/hoisted.js?q=1":"_astro/hoisted.AarTxVl4.js","@astrojs/react/client.js":"_astro/client.olTvLX7Y.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/remixicon.vdfP-dAX.eot","/_astro/remixicon.6wCUo71M.woff2","/_astro/remixicon.FOrXkwyo.woff","/_astro/remixicon.Eerb7bt5.ttf","/_astro/remixicon.24UuxNc2.svg","/_astro/about.Pz2c-M3k.css","/Logo.svg","/icon.svg","/_astro/Form.LSHZcHGQ.js","/_astro/client.olTvLX7Y.js","/_astro/contacts.dmpdLFWH.css","/_astro/hoisted.AarTxVl4.js","/_astro/hoisted.gOoBcOiX.js","/_astro/index.LFf77hJu.js","/projectsImages/project.png"]});

export { manifest };
