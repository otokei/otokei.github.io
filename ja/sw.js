// おとけい：一度開いたら電波がなくても使えるようにする
const CACHE = "otokei-ja-3082c8a280";
const FILES = ["./", "about.html", "align.html", "amp.html", "cable.html", "capo.html", "chord.html", "comp.html", "coverage.html", "db.html", "dbu.html", "degree.html", "delay.html", "distance.html", "eqchart.html", "eqq.html", "filesize.html", "harmonics.html", "hearing.html", "impedance.html", "index.html", "interval.html", "keyrange.html", "loudness.html", "manifest.webmanifest", "metronome.html", "mic.html", "msgs.js", "note.html", "power.html", "privacy.html", "ranges.html", "reverb.html", "room.html", "samples.html", "scale.html", "speed.html", "spl.html", "stereo.html", "tap.html", "timecode.html", "tone.html", "transpose.html", "tuner.html", "voicerange.html", "wavelength.html", "sw.js", "../assets/style.css", "../assets/tools.js", "../assets/tools2.js", "../assets/tools3.js", "../assets/tools4.js", "../assets/tools5.js", "../assets/tools6.js", "../assets/tools7.js", "../assets/icon-192.png", "../assets/icon-512.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((hit) => hit || fetch(e.request).then((res) => {
      // 文字（Google Fonts）とピアノの録音も、一度読んだら覚えておく
      if (res && (res.ok || res.type === "opaque") && (/fonts\.(googleapis|gstatic)\.com/.test(e.request.url) || /\/piano\/[^/]+\.mp3$/.test(e.request.url))) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match("index.html")))
  );
});
