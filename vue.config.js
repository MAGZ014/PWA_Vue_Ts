const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    name: "Lobos Kit PWA",
    themeColor: "#003571",
    backgroundColor: "#FFFFFF",
    display: "standalone",
    start_url: "/Login",
    short_name: "Lobos_Kit",
    manifestOptions: {
      id: "Lobos Kit PWA",
      dir: "ltr",
      lang: "es",
      scope: "/",
      display_override: ["window-controls-overlay"],
      orientation: "natural",
      description:
        "Lobos Kit es una aplicación móvil y web diseñada para ayudar a estudiantes de nuevo ingreso de la Universidad Tecnológica de San Juan del Río a cotizar y seleccionar equipos de cómputo, materiales y software necesarios para sus carreras. La app ofrece recomendaciones personalizadas basadas en el plan de estudios, comparaciones de precios, y opciones de financiamiento.",
      prefer_related_applications: false,
      categories: ["productivity"],
      icons: [
        {
          src: "/img/icons/Lobos-Lik-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/img/icons/Lobos-Lik-512x512.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      screenshots: [
        {
          src: "/assets/screen.png",
          sizes: "1080x1920",
          type: "image/png",
        },
        {
          src: "/assets/screen.png",
          sizes: "1080x1920",
          type: "image/png",
        },
        {
          src: "/assets/screen.png",
          sizes: "1080x1920",
          type: "image/png",
        },
      ],
      features: ["Cross Platform", "low-latency inking", "fast", "useful AI"],
      launch_handler: {
        client_mode: "navigate-existing",
      },
      shortcuts: [
        {
          name: "Start Live Session",
          short_name: "Start Live",
          description: "Jump direction into starting or joining a live session",
          url: "/?startLive",
          icons: [
            {
              src: "/assets/icon/256.png",
              sizes: "256x256",
              type: "image/png",
            },
          ],
        },
      ],
    },
  },
});
