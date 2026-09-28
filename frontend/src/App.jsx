import { useState, useEffect } from "react";

function App() {
  const [reported, setReported] = useState(false);
  const [timeLeft, setTimeLeft] = useState(72 * 60 * 60);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [report, setReport] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // 72-hour countdown
  useEffect(() => {
    if (!reported || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [reported, timeLeft]);

  // Format countdown
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  const formattedTime =
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  // Photo upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  // GPS location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        alert("Unable to get your location.");
      }
    );
  };

  // Simulated report submission
  const handleSync = () => {
    if (!report || !isOnline) return;

    setSyncing(true);

    setTimeout(() => {
      setReport((previous) => ({
        ...previous,
        status: "SUBMITTED",
      }));

      setSyncing(false);
    }, 2000);
  };

  return (
    <div className="app">
      <header>
        <h1>PMFBY Saathi</h1>
        <p>Crop Insurance Assistance</p>
      </header>

      <main>
        <section className="welcome">
          <p>Namaste, Farmer</p>

          <h2>Protect your crop claim.</h2>

          <p>
            Report crop damage within the 72-hour window and keep your claim
            documentation safe.
          </p>
        </section>

        {!reported ? (
          <section className="damage-card">
            <h2>Crop Damage</h2>

            <p>
              If your crop has been damaged by an unexpected event, report it
              immediately.
            </p>

            <button
              className="primary-button"
              onClick={() => {
                const now = new Date();

                const newReport = {
                  id: "PMFBY-" + Date.now(),
                  createdAt: now.toISOString(),
                  deadline: new Date(
                    now.getTime() + 72 * 60 * 60 * 1000
                  ).toISOString(),
                  status: "PENDING",
                };

                setReport(newReport);
                setReported(true);
              }}
            >
              Report Crop Damage
            </button>
          </section>
        ) : (
          <section className="timer-card">
            <p className="status">REPORT STARTED</p>

            <h2>{formattedTime}</h2>

            <p>Your 72-hour reporting window has started.</p>

            <div>
              <button onClick={() => setIsOnline(!isOnline)}>
                {isOnline ? "Simulate Offline Mode" : "Restore Network"}
              </button>
            </div>

            <div className="info">
              <p>
                <strong>Report ID:</strong> {report?.id}
              </p>

              <p>
                <strong>Status:</strong> {report?.status}
              </p>

              <p>
                <strong>Network:</strong>{" "}
                {isOnline ? "ONLINE" : "OFFLINE"}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {location
                  ? `${location.latitude.toFixed(
                      5
                    )}, ${location.longitude.toFixed(5)}`
                  : "Not captured"}
              </p>

              <button onClick={getLocation}>
                Capture My Location
              </button>

              <p>
                <strong>Photo:</strong>{" "}
                {photo ? "Uploaded successfully" : "Not uploaded"}
              </p>

              {!isOnline && (
                <p>
                  Report saved on device. Waiting for network...
                </p>
              )}

              {isOnline && report?.status === "PENDING" && (
                <button onClick={handleSync}>
                  {syncing ? "Syncing..." : "Submit Report"}
                </button>
              )}

              {report?.status === "SUBMITTED" && (
                <p>
                  Report successfully submitted.
                </p>
              )}

              <label className="upload-button">
                {photo ? "Change Photo" : "Upload Damage Photo"}

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  hidden
                />
              </label>

              {photo && (
                <img
                  src={photo}
                  alt="Crop damage"
                  className="photo-preview"
                />
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;