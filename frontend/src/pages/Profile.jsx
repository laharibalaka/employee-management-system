import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
function Profile() {
  const [showImage, setShowImage] =
  useState(false);

  const [email, setEmail] = useState(
    localStorage.getItem("email") || ""
  );

  const [password, setPassword] =
    useState("");

  const [photo, setPhoto] =
    useState(
      null);

  const [photoUrl, setPhotoUrl] =
    useState(
      localStorage.getItem("photo") || ""
    );

  const name =
    localStorage.getItem("name");

  const role =
    localStorage.getItem("role");

  const userId =
    localStorage.getItem("userId");

  const uploadPhoto = async () => {

    if (!photo) {

      alert("Please select a photo");
      return;

    }

    try {

      const formData =
        new FormData();

      formData.append(
        "photo",
        photo
      );

      const uploadRes =
        await axios.post(

          "https://employee-management-system-5fj7.onrender.com/api/upload/profile",

          formData

        );

      const imageUrl =
        uploadRes.data.photoUrl;

      await axios.put(

        "https://employee-management-system-5fj7.onrender.com/api/auth/photo/" +
          userId,

        {
          photo: imageUrl,
        }

      );

      localStorage.setItem(
        "photo",
        imageUrl
      );

      setPhotoUrl(
        imageUrl
      );

      alert(
        "Photo Uploaded Successfully"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Photo Upload Failed"
      );

    }

  };

  const updateProfile = async () => {

    try {

      await axios.put(

        "https://employee-management-system-5fj7.onrender.com/api/auth/profile/" +
          userId,

        {
          email,
          password,
        }

      );

      localStorage.setItem(
        "email",
        email
      );

      alert(
        "Profile Updated Successfully"
      );

    } catch (err) {

      console.log(err);

      alert("Error");

    }

  };

  return (

    <Layout>

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-lg mb-8">

          <h1 className="text-4xl font-bold">
            👤 My Profile
          </h1>

          <p className="mt-2 text-blue-100">
            Manage your account information
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* Left Card */}

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

            {photoUrl ? (

 <img
  src={photoUrl}
  alt="Profile"
  onClick={() =>
    setShowImage(true)
  }
  className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-blue-500 cursor-pointer"
/>

            ) : (

              <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mx-auto text-5xl">

                👤

              </div>

            )}

            <h2 className="text-2xl font-bold mt-4">
              {name}
            </h2>

            <p className="text-gray-500 mt-2">
              {role}
            </p>
            
<p className="text-sm text-gray-600 mt-2">
  Employee ID:
  EMS-{userId.slice(-6).toUpperCase()}
</p>
          </div>

          {/* Right Card */}

          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">
              Account Details
            </h2>

            <div className="space-y-5">

              <div>

                <label className="block mb-2 font-medium">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  className="w-full border p-3 rounded-xl"
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full border p-3 rounded-xl"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

              </div>

              <div>

                <label className="block mb-2 font-medium">
                  Profile Photo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setPhoto(
                      e.target.files[0]
                    )
                  }
                  className="w-full"
                />

                <button
                  type="button"
                  onClick={uploadPhoto}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl mt-3"
                >
                  Upload Photo
                </button>

              </div>

              <button
                onClick={updateProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Update Profile
              </button>

            </div>

          </div>

        </div>

      </div>
      {showImage && (

  <div
    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
    onClick={() =>
      setShowImage(false)
    }
  >

    <img
      src={photoUrl}
      alt="Profile"
      className="max-h-[80vh] max-w-[80vw] rounded-2xl shadow-2xl"
    />

  </div>

)}

    </Layout>

  );

}

export default Profile;