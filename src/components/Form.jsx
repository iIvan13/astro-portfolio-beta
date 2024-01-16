import { useState } from "react";
import "../styles/form.css";

function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [classBut, setClassBut] = useState("submit__buttom active");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    return (
      formData.name.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.subject.trim() !== "" &&
      formData.message.trim() !== ""
    );
  };

  async function sendEmail(event) {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setClassBut("submit__buttom active");
    try {
      const res = await fetch("./api/sendEmail.json", {
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
          text: formData.message,
        }),
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
        message: "",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form>
      <span className="responsive__inputs">
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Name"
          autoComplete="off"
          data-aos="fade-right"
          data-aos-duration="1000"
        />

        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Email"
          autoComplete="off"
          data-aos="fade-left"
          data-aos-duration="1000"
        />
      </span>

      <input
        type="text"
        id="title"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        required
        placeholder="Subject"
        autoComplete="off"
        data-aos="zoom-in"
        data-aos-duration="1300"
      />

      <textarea
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        rows="4"
        required
        placeholder="Message"
        autoComplete="off"
        data-aos="zoom-in"
        data-aos-duration="1300"></textarea>

      <button
        type="submit"
        className={classBut}
        onClick={sendEmail}
        id="send-email"
        disabled={isLoading}
        data-aos="zoom-in"
        data-aos-duration="1400">
        {isLoading ? (
          <span className="load">
            <svg
              className="svg-icon"
              fill="none"
              height="17.45"
              viewBox="0 0 20 20"
              width="17.45"
              xmlns="http://www.w3.org/2000/svg">
              <g stroke="#d5eeff" strokeLinecap="round" strokeWidth="1.5">
                <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
                <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
              </g>
            </svg>
          </span>
        ) : (
          <span>
            Send <i className="ri-send-plane-fill"></i>
          </span>
        )}
      </button>
    </form>
  );
}

export default Form;
