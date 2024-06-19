import { useState } from "react";
import "./App.css";
import { COUNTRIES } from "./constantes";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [time, setTime] = useState(null);
  const [results, setResults] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = COUNTRIES.map((country) => {
      const date = time;
      const newDate = date.clone().add(country.difference, "hour");
      return `${country.countries} - ${newDate.format("HH:mm")}`;
    });

    setResults(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(results.join("\n"));
    toast.success("Copiado al portapapeles", {
      icon: "📋",
    });
  };
  return (
    <main>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker"]}>
              <TimePicker
                label="Ingrese la hora"
                value={time}
                onChange={(newValue) => setTime(newValue)}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white", // Cambia el color del texto a blanco
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Cambia el color del borde a blanco
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Cambia el color del borde al pasar el mouse
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Cambia el color del borde al enfocar
                    },
                    "&.Mui-focused": {
                      color: "white", // Cambia el color del texto al enfocar
                    },
                  },
                  "& .MuiFormLabel-root": {
                    color: "white", // Cambia el color del label a blanco
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white", // Cambia el color del icono a blanco
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <button>Calcular</button>
        </form>

        <div className="result">
          {results && (
            <>
              <ul>
                {results.map((result, index) => (
                  <li key={index}>{result}</li>
                ))}
              </ul>
              <button onClick={handleCopy} className="result__button">
                Copiar
                <span role="img" aria-label="copy">
                  📋
                </span>
              </button>
            </>
          )}
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
    </main>
  );
}

export default App;
