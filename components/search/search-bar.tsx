"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathName = usePathname();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("query", query);
    console.log("search bar pressed");
    if (pathName == "/private/search_results") {
      router.refresh();
    } else {
      router.push("/private/search_results");
    };
  };

  return (
    <form onSubmit={handleSearch} style={styles.form}>
      <input
        type="text"
        name="query"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your cravings!"
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>
        Search
      </button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  },
  input: {
    width: "300px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "all 0.3s",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#000",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};

