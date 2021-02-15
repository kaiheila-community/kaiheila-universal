module.exports = {
  productName: 'Kaiheila',
  appId: 'cn.kaiheila.kaiheila-uni',
  directories: {
    output: '.build',
    buildResources: 'resources',
  },
  files: [
    'dist/**/*',
    'resources/**/*',
    'resources/kaiheila*',
    'package.json',
    '**/node_modules/**/*',
  ],
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  mac: {
    category: 'public.app-category.social-networking',
    target: 'dmg',
    darkModeSupport: true,
    icon: 'resources/kaiheila-uni.icns',
  },
  win: {
    target: 'nsis',
    icon: 'resources/kaiheila-uni.ico',
  },
  linux: {
    category: 'Network',
    synopsis: 'Kaiheila',
    icon: 'resources/kaiheila-uni.png',
    target: 'AppImage',
  },
  publish: [
    {
      provider: 'generic',
      url: 'https://delivr.vbox.moe/kaiheila-uni/releases/',
      publishAutoUpdate: true,
    },
  ],
}
