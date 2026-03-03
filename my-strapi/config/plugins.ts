module.exports = ({ env }) => ({
  // Настройки GraphQL
  graphql: {
    enabled: true,
    config: {
      playgroundAlways: true,
      defaultLimit: 50,
      maxLimit: 1000,
      depthLimit: 10,
    },
  },

  // Настройки конвертации в WebP
  'webp-converter': {
    enabled: true,
    config: {
      mimeTypes: ['image/png', 'image/jpeg', 'image/jpg'],
      options: {
        quality: 80, 
      },
    },
  },

  // Настройки загрузки (если нужно отключить миниатюры Sharp)
  upload: {
    config: {
      breakpoints: false, 
    },
  },
});
