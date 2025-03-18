import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  // Fetch passwords
  const getPasswords = async () => {
    try {
      const req = await fetch("http://localhost:8888/");
      const passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
      toast.error("Error fetching passwords");
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  // Copy text to clipboard
  const copyText = (text) => {
    toast('Copied to clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  // Toggle password visibility
  const showPassword = () => {
    if (passwordRef.current.type === 'password') {
      passwordRef.current.type = 'text';
      ref.current.src = "src/assets/eye1.png"; // Update with correct path
    } else {
      passwordRef.current.type = 'password';
      ref.current.src = "src/assets/eyecross.png"; // Update with correct path
    }
  };

  // Save new password
  const savePassword = async () => {
    try {
      const newPassword = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newPassword]);
      await fetch("http://localhost:8888/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });
      setForm({ site: "", username: "", password: "" });
      toast('Password Saved!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error saving password:", error);
      toast.error("Error saving password");
    }
  };

  // Edit password
  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);
    setForm(passwordToEdit);
    setPasswordArray(passwordArray.filter(item => item.id !== id));
    toast('Edit Password', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Delete password
  const deletePassword = async (id) => {
    if (window.confirm("Do you really want to delete this password?")) {
      try {
        setPasswordArray(passwordArray.filter(item => item.id !== id));
        await fetch("http://localhost:8888/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        toast('Delete Password', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Error deleting password");
      }
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="p-2 md:p-0 md:mycontainer min-h-[81vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700"> &lt;</span>
          <span> Passop</span>
          <span className="text-green-700">OP/ &gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your own password Manager</p>

        <div className="text-white flex flex-col p-4 text-black gap-6 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URl"
            className="rounded-full border border-green-600 text-black w-full py-1 px-4"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter UserName"
              className="rounded-full border border-green-600 text-black w-full py-1 px-4"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-600 text-black w-full py-1 px-4"
                type="password"
                name="password"
                id="password"
              />
              <span className="absolute right-[1px] top-[1px] cursor-pointer" onClick={showPassword}>
                <img
                  ref={ref}
                  className="p-1.5"
                  width={30}
                  roundedFull
                  src="src/assets/eye1.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-500 hover:bg-green-300 rounded-full px-2 py-2 w-fit border border-black"
          >
            <lord-icon
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>{" "}
            Save Password
          </button>
        </div>

        <div className="password">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-200">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 border border-white text-center min-w-32">
                      <a href={item.site} target="_blank" rel="noopener noreferrer">
                        {item.site}
                      </a>
                      <img
                        className="px-2 w-8 cursor-pointer"
                        onClick={() => copyText(item.site)}
                        src="src/assets/copy.png"
                        alt="copy"
                      />
                    </td>
                    <td className="py-2 border border-white text-center min-w-32">
                      {item.username}
                      <img
                        className="px-2 w-8 cursor-pointer"
                        onClick={() => copyText(item.username)}
                        src="src/assets/copy.png"
                        alt="copy"
                      />
                    </td>
                    <td className="py-2 border border-white text-center min-w-32">
                      {item.password}
                      <img
                        className="px-2 w-8 cursor-pointer"
                        onClick={() => copyText(item.password)}
                        src="src/assets/copy.png"
                        alt="copy"
                      />
                    </td>
                    <td className="py-2 border border-white text-center min-w-32">
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => editPassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/exymduqj.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-2"
                        onClick={() => deletePassword(item.id)}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/hwjcdycb.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
