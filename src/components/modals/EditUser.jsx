import React, { useState } from "react";
import Swal from "sweetalert2";
import { RingLoader } from "react-spinners";
import { updateUser } from "../../helpers/userHelper/createEditDeleteUser";

export const EditUser = ({ showModal, setShowModal, row }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    role: row.role,
    isAdmin: row.isAdmin,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await updateUser(formData);
    setShowModal(false);
    if (response.status) {
      Swal.fire({
        title: "Başarılı",
        text: response.message,
        icon: "success",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
        hideClass: {
          popup: "animate_animated animate_fadeOutUp",
        },
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "Hata",
        text: response.message,
        icon: "error",
        showClass: {
          popup: "animate_animated animate_fadeInDown",
        },
        hideClass: {
          popup: "animate_animated animate_fadeOutUp",
        },
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div>
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-2 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold">Kullanıcı Düzenle</h3>
                    <button
                      className="pl-10 ml-auto bg-transparent border-0 text-black text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 pr-20 pl-20 flex-auto">
                    <div className="w-full">
                      <div className="flex flex-col py-2">
                        <div className="flex items-center mb-4">
                          <p className="mr-2">Adı:</p>
                          <input
                            className="border rounded px-2 py-1"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex items-center mb-4">
                          <p className="mr-2">Soyadı:</p>
                          <input
                            className="border rounded px-2 py-1"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex items-center mb-4">
                          <p className="mr-2">Email:</p>
                          <input
                            className="border rounded px-2 py-1"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex items-center mb-4">
                          <p className="mr-2">Kullanıcı Rolü:</p>
                          <input
                            className="border rounded px-2 py-1"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="flex items-center mb-4">
                          <label htmlFor="isAdmin" className="mr-2">
                            Admin:
                          </label>
                          <select
                            id="isAdmin"
                            name="isAdmin"
                            className="border rounded px-2 py-1"
                            value={formData.isAdmin}
                            onChange={handleInputChange}
                          >
                            <option value={true}>Evet</option>
                            <option value={false}>Hayır</option>
                          </select>
                        </div>

                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 relative"
                          onClick={handleSubmit}
                        >
                          {loading && (
                            <div className="flex items-center justify-center">
                              <RingLoader color="white" size={25} />
                              &nbsp; Kaydediliyor...
                            </div>
                          )}
                          {!loading && "Kaydet"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-40 bg-black"
            onClick={() => setShowModal(false)}
          ></div>
        </>
      )}
    </div>
  );
};
