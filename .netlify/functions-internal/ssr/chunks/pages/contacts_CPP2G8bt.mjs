import { e as createAstro, f as createComponent, r as renderTemplate, g as renderComponent, m as maybeRenderHead } from '../astro_ueF1Yx1r.mjs';
import { $ as $$Layout } from './about_CpuqMrM8.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, StrictMode } from 'react';
/* empty css                             */

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [butClass, setButClass] = useState("submit__buttom active");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const validateForm = () => {
    return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.subject.trim() !== "" && formData.message.trim() !== "";
  };
  async function sendEmail(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setButClass("submit__buttom active");
    try {
      const res = await fetch("/api/sendEmail.json", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `Acme <onboarding@resend.dev>`,
          to: ["todelanoivan13@gmail.com"],
          subject: formData.subject,
          html: `
            <h1>Name: ${formData.name}</h1>
            <h3>E-mail: ${formData.email}</h3>
            <strong>Subject: ${formData.subject}</strong>
            <p>Message: ${formData.message}</p>
          `,
          text: formData.message
        })
      });
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsxs("form", { children: [
    /* @__PURE__ */ jsxs("span", { className: "responsive__inputs", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          id: "name",
          name: "name",
          value: formData.name,
          onChange: handleChange,
          required: true,
          placeholder: "Name",
          autoComplete: "off",
          "data-aos": "fade-right",
          "data-aos-duration": "1000"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "email",
          id: "email",
          name: "email",
          value: formData.email,
          onChange: handleChange,
          required: true,
          placeholder: "Email",
          autoComplete: "off",
          "data-aos": "fade-left",
          "data-aos-duration": "1000"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        id: "title",
        name: "subject",
        value: formData.subject,
        onChange: handleChange,
        required: true,
        placeholder: "Subject",
        autoComplete: "off",
        "data-aos": "zoom-in",
        "data-aos-duration": "1300"
      }
    ),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        id: "message",
        name: "message",
        value: formData.message,
        onChange: handleChange,
        rows: "4",
        required: true,
        placeholder: "Message",
        autoComplete: "off",
        "data-aos": "zoom-in",
        "data-aos-duration": "1300"
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "submit",
        className: butClass,
        onClick: sendEmail,
        id: "send-email",
        disabled: isLoading,
        "data-aos": "zoom-in",
        "data-aos-duration": "1400",
        children: isLoading ? /* @__PURE__ */ jsx("span", { className: "load", children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "svg-icon",
            fill: "none",
            height: "17.45",
            viewBox: "0 0 20 20",
            width: "17.45",
            xmlns: "http://www.w3.org/2000/svg",
            children: /* @__PURE__ */ jsxs("g", { stroke: "#d5eeff", strokeLinecap: "round", strokeWidth: "1.5", children: [
              /* @__PURE__ */ jsx("path", { d: "m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468" }),
              /* @__PURE__ */ jsx("path", { d: "m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986" })
            ] })
          }
        ) }) : /* @__PURE__ */ jsxs("span", { children: [
          "Send ",
          /* @__PURE__ */ jsx("i", { className: "ri-send-plane-fill" })
        ] })
      }
    )
  ] }) });
}

const $$Astro = createAstro();
const $$Contacts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contacts;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Contacts", "data-astro-cid-qwfq4wri": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 data-astro-cid-qwfq4wri> <span class="blue__text" data-astro-cid-qwfq4wri>/&nbsp</span>contacts
</h1> <section data-astro-cid-qwfq4wri> <article data-astro-cid-qwfq4wri> <div class="contact__info" data-aos="zoom-in" data-aos-duration="800" data-astro-cid-qwfq4wri> <p data-astro-cid-qwfq4wri>
I’m interested in freelance opportunities. However, if you have other
          request or question, don’t hesitate to contact me.
</p> </div> <div class="contact-form" data-astro-cid-qwfq4wri> <div class="message-here" data-astro-cid-qwfq4wri> <h3 data-aos="zoom-in" data-aos-duration="500" data-astro-cid-qwfq4wri>Message me here</h3> <ul data-astro-cid-qwfq4wri> <li data-aos="fade-left" data-aos-duration="500" data-astro-cid-qwfq4wri> <i class="ri-whatsapp-line icons" data-astro-cid-qwfq4wri></i> +51-921-853-713
</li> <li data-aos="fade-left" data-aos-duration="1000" data-astro-cid-qwfq4wri> <i class="ri-mail-line icons" data-astro-cid-qwfq4wri></i> ivandev2oo6@gmail.com
</li> </ul> </div> ${renderComponent($$result2, "Form", Form, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/mnt/sda2/Portafolio (copia)/src/components/Form.jsx", "client:component-export": "default", "data-astro-cid-qwfq4wri": true })} </div> </article> </section> ` })} `;
}, "/mnt/sda2/Portafolio (copia)/src/pages/contacts.astro", void 0);

const $$file = "/mnt/sda2/Portafolio (copia)/src/pages/contacts.astro";
const $$url = "/contacts";

export { $$Contacts as default, $$file as file, $$url as url };
