import flowbite from 'flowbite-react/tailwind';
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        main_color: '#004136',
        secondary_color: '#0041361A',
        dark_color:'#00332B',
        third_color: '#EAF7E8',
        text_color: '#141313',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};