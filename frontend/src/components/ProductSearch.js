// // // frontend/src/components/ProductSearch.js
// // import React, { useState } from "react";
// // import axios from "axios";
// // import { BACKEND_URL } from "../api";
// // img
// // function ProductSearch() {
// //   const [file, setFile] = useState(null);
// //   const [imageUrl, setImageUrl] = useState("");
// //   const [results, setResults] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const handleFileChange = (e) => {
// //     setFile(e.target.files[0]);
// //     setImageUrl(""); // reset URL if file selected
// //   };

// //   const handleUrlChange = (e) => {
// //     setImageUrl(e.target.value);
// //     setFile(null); // reset file if URL entered
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!file && !imageUrl) {
// //       setError("Please upload a file or enter an image URL.");
// //       return;
// //     }

// //     setLoading(true);
// //     setError("");
// //     const formData = new FormData();
// //     if (file) formData.append("image", file);
// //     if (imageUrl) formData.append("imageUrl", imageUrl);

// //     try {
// //       const res = await axios.post(`${BACKEND_URL}/products/search`, formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       setResults(res.data.results || []);
// //       setFile(null);
// //       setImageUrl("");
// //     } catch (err) {
// //       console.error("Search error:", err);
// //       setError("Search failed. Please check the console for details.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Helper to construct image URL dynamically
// //   const getImageSrc = (url) => {
// //     if (!url) return "";
// //     return url.startsWith("http") ? url : `${BACKEND_URL.replace("/api", "")}${url}`;
// //   };

// //   return (
// //     <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
// //       <h2>Visual Product Matcher</h2>

// //       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
// //         <div>
// //           <input type="file" onChange={handleFileChange} accept="image/*" />
// //         </div>
// //         <div>
// //           <input
// //             type="text"
// //             placeholder="Or enter image URL"
// //             value={imageUrl}
// //             onChange={handleUrlChange}
// //             style={{ width: "100%", marginTop: "10px" }}
// //           />
// //         </div>
// //         <button type="submit" style={{ marginTop: "10px" }}>
// //           {loading ? "Searching..." : "Find Similar Products"}
// //         </button>
// //         {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
// //       </form>

// //       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
// //         {results.map((product) => (
// //           <div key={product._id} style={{ textAlign: "center" }}>
// //             <img
// //               src={getImageSrc(product.imageUrl)}
// //               alt={product.name}
// //               width={150}
// //               style={{ borderRadius: "10px", objectFit: "cover" }}
// //             />
// //             <p>{product.name}</p>
// //             <p style={{ fontSize: "12px", color: "gray" }}>
// //               Similarity: {(product.similarity * 100).toFixed(2)}%
// //             </p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ProductSearch;
// // frontend/src/components/ProductSearch.js






// this is working code
// import React, { useState } from "react";
// import axios from "axios";
// import { BACKEND_URL } from "../api";

// function ProductSearch() {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//     setImageUrl(""); // reset URL if file selected
//   };

//   const handleUrlChange = (e) => {
//     setImageUrl(e.target.value);
//     setFile(null); // reset file if URL entered
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file && !imageUrl) {
//       setError("Please upload a file or enter an image URL.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     const formData = new FormData();
//     if (file) formData.append("image", file);
//     if (imageUrl) formData.append("imageUrl", imageUrl);

//     try {
//       const res = await axios.post(`${BACKEND_URL}/products/search`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResults(res.data.results || []);
//       setFile(null);
//       setImageUrl("");
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Search failed. Please check the console for details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper to construct image URL dynamically
// const getImageSrc = (url) => {
//   if (!url) return "/placeholder.png"; // optional fallback placeholder
//   return url.startsWith("http") ? url : `${BACKEND_URL.split("/api")[0]}/${url}`;
// };


//   return (
//     <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
//       <h2>Visual Product Matcher</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <div>
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Or enter image URL"
//             value={imageUrl}
//             onChange={handleUrlChange}
//             style={{ width: "100%", marginTop: "10px" }}
//           />
//         </div>
//         <button type="submit" style={{ marginTop: "10px" }}>
//           {loading ? "Searching..." : "Find Similar Products"}
//         </button>
//         {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
//       </form>

//       <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
//         {results.map((product) => (
//           <div key={product._id} style={{ textAlign: "center" }}>
//             <img
//               src={getImageSrc(product.imageUrl)}
//               alt={product.name}
//               width={150}
//               style={{ borderRadius: "10px", objectFit: "cover" }}
//               onError={(e) => (e.target.src = "/placeholder.png")} // fallback if image fails
//             />
//             <p>{product.name}</p>
//             <p style={{ fontSize: "12px", color: "gray" }}>
//               Similarity: {(product.similarity * 100).toFixed(2)}%
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductSearch;
import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../api";

function ProductSearch() {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImageUrl("");
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !imageUrl) {
      setError("Please upload a file or enter an image URL.");
      return;
    }

    setLoading(true);
    setError("");
    const formData = new FormData();
    if (file) formData.append("image", file);
    if (imageUrl) formData.append("imageUrl", imageUrl);

    try {
      const res = await axios.post(`${BACKEND_URL}/products/search`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(res.data.results || []);
      setFile(null);
      setImageUrl("");
    } catch (err) {
      console.error("Search error:", err);
      setError("Search failed. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const getImageSrc = (url) => {
    if (!url) return "/placeholder.png";
    return url.startsWith("http") ? url : `${BACKEND_URL.split("/api")[0]}/${url}`;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
          Visual Product Matcher
        </h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            />
            <input
              type="text"
              placeholder="Or enter image URL"
              value={imageUrl}
              onChange={handleUrlChange}
              style={{
                flex: 2,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#4a90e2",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#357ABD")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
          >
            {loading ? "Searching..." : "Find Similar Products"}
          </button>
          {error && <p style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</p>}
        </form>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {results.map((product) => (
            <div
              key={product._id}
              style={{
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,0,0,0.05)";
              }}
            >
              <img
                src={getImageSrc(product.imageUrl)}
                alt={product.name}
                width={150}
                height={150}
                style={{ borderRadius: "12px", objectFit: "cover", marginBottom: "10px" }}
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
              <p style={{ fontWeight: "bold", margin: "5px 0", color: "#333" }}>{product.name}</p>
              <p style={{ fontSize: "12px", color: "#555" }}>
                Similarity: {(product.similarity * 100).toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSearch;
