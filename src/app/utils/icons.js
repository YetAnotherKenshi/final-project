export function Star({ fill, scale = 6 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className={`w-${scale} h-${scale} ${
        fill ? "fill-yellow-400" : "fill-gray-300"
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}

export function Headphones(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8em"
      height="8em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="white"
        d="M200.47 64.07A101.37 101.37 0 0 0 128.77 34H128A102 102 0 0 0 26 136v56a22 22 0 0 0 22 22h16a22 22 0 0 0 22-22v-40a22 22 0 0 0-22-22H38.2A90.12 90.12 0 0 1 192 72.52A89.41 89.41 0 0 1 217.81 130H192a22 22 0 0 0-22 22v40a22 22 0 0 0 22 22h16a22 22 0 0 0 22-22v-56a101.44 101.44 0 0 0-29.53-71.93ZM64 142a10 10 0 0 1 10 10v40a10 10 0 0 1-10 10H48a10 10 0 0 1-10-10v-50Zm154 50a10 10 0 0 1-10 10h-16a10 10 0 0 1-10-10v-40a10 10 0 0 1 10-10h26Z"
      ></path>
    </svg>
  );
}

export function Keyboard(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8em"
      height="8em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="white"
        d="M223.51 50h-191A14.51 14.51 0 0 0 18 64.49v127A14.51 14.51 0 0 0 32.49 206h191A14.51 14.51 0 0 0 238 191.51v-127A14.51 14.51 0 0 0 223.51 50ZM226 191.51a2.49 2.49 0 0 1-2.49 2.49h-191a2.49 2.49 0 0 1-2.51-2.49v-127A2.49 2.49 0 0 1 32.49 62h191a2.49 2.49 0 0 1 2.51 2.49ZM206 128a6 6 0 0 1-6 6H56a6 6 0 0 1 0-12h144a6 6 0 0 1 6 6Zm0-32a6 6 0 0 1-6 6H56a6 6 0 0 1 0-12h144a6 6 0 0 1 6 6ZM70 160a6 6 0 0 1-6 6h-8a6 6 0 0 1 0-12h8a6 6 0 0 1 6 6Zm96 0a6 6 0 0 1-6 6H96a6 6 0 0 1 0-12h64a6 6 0 0 1 6 6Zm40 0a6 6 0 0 1-6 6h-8a6 6 0 0 1 0-12h8a6 6 0 0 1 6 6Z"
      ></path>
    </svg>
  );
}

export function Mouse(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8em"
      height="8em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="white"
        d="M144 18h-32a62.07 62.07 0 0 0-62 62v96a62.07 62.07 0 0 0 62 62h32a62.07 62.07 0 0 0 62-62V80a62.07 62.07 0 0 0-62-62Zm50 62v26h-60V30h10a50.06 50.06 0 0 1 50 50Zm-82-50h10v76H62V80a50.06 50.06 0 0 1 50-50Zm32 196h-32a50.06 50.06 0 0 1-50-50v-58h132v58a50.06 50.06 0 0 1-50 50Z"
      ></path>
    </svg>
  );
}

export function Monitor(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8em"
      height="8em"
      viewBox="0 0 256 256"
      {...props}
    >
      <path
        fill="white"
        d="M208 42H48a22 22 0 0 0-22 22v112a22 22 0 0 0 22 22h160a22 22 0 0 0 22-22V64a22 22 0 0 0-22-22Zm10 134a10 10 0 0 1-10 10H48a10 10 0 0 1-10-10V64a10 10 0 0 1 10-10h160a10 10 0 0 1 10 10Zm-52 48a6 6 0 0 1-6 6H96a6 6 0 0 1 0-12h64a6 6 0 0 1 6 6Z"
      ></path>
    </svg>
  );
}

export function Check(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10em"
      height="10em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="#16a34a"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      ></path>
    </svg>
  );
}

export function MousePad(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8em"
      height="8em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="white"
        d="M16.5 22q-2.275 0-3.888-1.613T11 16.5V15h11v1.5q0 2.275-1.6 3.888T16.5 22ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v2.4q-1.075-1.15-2.5-1.775T16.5 6q-3.125 0-5.313 2.188T9 13.5v3q0 .925.213 1.813T9.85 20H4Zm7-7q.075-1.875 1.35-3.238t3.15-1.687V13H11Zm6.5 0V8.075q1.875.325 3.15 1.688T22 13h-4.5Z"
      ></path>
    </svg>
  );
}
