import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ formData, setContact }) => {
  const [ownerDatas, setOwnerDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  console.log("This is ownerDatas:", ownerDatas);

  useEffect(() => {
    const getOwnerDatas = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await fetch(`/api/user/${formData?.userRef}`, {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          return setError(data.message);
        }

        console.log("this is data:", data);
        setOwnerDatas(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getOwnerDatas();
  }, [formData?.userRef]);

  return (
    <div className="w-full">
      {ownerDatas && (
        <h2>
          Contact <strong>{ownerDatas?.username}</strong> for{" "}
          <strong>{formData?.name.toLowerCase()}</strong>
        </h2>
      )}

      <textarea
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Enter your message here..."
        className=" bg-white rounded-lg p-3 w-full my-6 shadow-xl outline-orange-400"
      ></textarea>

      <Link
        to={`mailto:${ownerDatas?.email}?subject=Regarding ${formData?.name}&body=${message}`}
        className="block w-full bg-slate-700 text-white rounded-md p-3 text-center uppercase"
      >
        Send Message
      </Link>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Contact;
