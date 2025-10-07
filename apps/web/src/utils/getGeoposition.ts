async function getGeoPosition(): Promise<{ latitude: number; longitude: number } | null> {
  if (!("geolocation" in navigator)) return null;
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => resolve(null), // user denied or error
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 }
    );
  });
}

export default getGeoPosition