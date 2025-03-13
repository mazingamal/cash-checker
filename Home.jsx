import React, { useState, useEffect } from "react";
import Input from "./src/components/Input";
import { Sun, Moon } from "lucide-react";
import { GiCash } from "react-icons/gi";
import { RiResetRightLine } from "react-icons/ri";
import { CiCircleCheck } from "react-icons/ci";

const formatNumber = (value) => {
  if (!value) return "";
  return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const parseNumber = (value) => value.replace(/,/g, "");

const SalesChecker = () => {
  const [totalSales, setTotalSales] = useState("");
  const [segments, setSegments] = useState({
    1000: "",
    500: "",
    200: "",
    100: "",
    50: "",
    20: "",
  });
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleTotalSalesChange = (e) =>
    setTotalSales(formatNumber(e.target.value));

  const handleSegmentChange = (e) => {
    const { name, value } = e.target;
    setSegments((prev) => ({ ...prev, [name]: formatNumber(value) }));
  };

  const handleSubmit = () => {
    const totalSalesNum = Number(parseNumber(totalSales)) || 0;
    const totalFromSegments = Object.entries(segments).reduce(
      (sum, [key, value]) =>
        sum + (Number(parseNumber(value)) || 0) * parseInt(key),
      0
    );

    setResult(
      totalSalesNum === totalFromSegments
        ? { success: true, message: `لا يوجد فرق` }
        : totalSalesNum > totalFromSegments
        ? {
            success: false,
            message: `  لديك فارق بمقدار ${Math.abs(
              totalFromSegments - totalSalesNum
            ).toLocaleString()} جنيه `,
          }
        : {
            success: false,
            message: ` لديك فارق بمقدار  ${Math.abs(
              totalFromSegments - totalSalesNum
            ).toLocaleString()} جنيه `,
          }
    );
  };

  const handleReset = () => {
    setTotalSales("");
    setSegments({
      1000: "",
      500: "",
      200: "",
      100: "",
      50: "",
      20: "",
    });
    setResult(null);
  };

  return (
    <div
      className={`flex flex-col items-center min-h-screen p-6 transition duration-300 ${
        darkMode ? "bg-gray-900 text-slate-50" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold justify-center items-center flex gap-2">
          Cash <GiCash className="text-green-800" />
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800  hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-slate-50" />
          ) : (
            <Moon className="w-6 h-6 text-slate-50" />
          )}
        </button>
      </div>

      {/* Total Sales Input */}
      <div className="w-full max-w-md text-center mb-6">
        <label className="block text-lg font-semibold mb-2">
          إجمالي المبيعات
        </label>
        <Input
          type="text"
          name="totalSales"
          value={totalSales}
          onChange={handleTotalSalesChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md text-center bg-white dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Money Segments Inputs */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {Object.keys(segments).map((key) => (
          <div key={key} className="text-center">
            <label className="block text-sm font-bold">{key} جنيه</label>{" "}
            <Input
              type="text"
              name={key}
              value={segments[key]}
              onChange={handleSegmentChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md text-center bg-white dark:bg-gray-800 dark:text-white"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white font-semibold justify-center items-center flex gap-2 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          <CiCircleCheck className="font-extrabold text-xl" />
          مقارنة
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-gray-500 text-white font-semibold items-center justify-center flex gap-2 rounded-md shadow-md hover:bg-gray-600 transition"
        >
          <RiResetRightLine />
          إعادة
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div
          className={`mt-6 p-4 w-full max-w-md text-center text-lg font-semibold rounded-md shadow-md ${
            result.success
              ? `bg-green-600 ${darkMode ? "text-white" : "text-gray-900"}`
              : `bg-red-500 ${darkMode ? "text-white" : "text-gray-900"}`
          } rtl`}
        >
          {result.message}
        </div>
      )}
    </div>
  );
};

export default SalesChecker;
