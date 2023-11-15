import * as React from "react";
const TaskIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="-2 0 32 32"
    fill=""
    {...props}
  >
    <title>{"clipboard"}</title>
    <path
      fillRule="evenodd"
      d="M21 16H7a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2Zm0 5H7a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2Zm0 5H7a1 1 0 1 1 0-2h14a1 1 0 1 1 0 2ZM9 4h2.223c0-1.104 1.243-2 2.777-2s2.777.896 2.777 2H19v4H9V4Zm15 0h-3V2h-2.693C17.44.81 15.846 0 14 0c-1.846 0-3.44.81-4.307 2H7v2H4a4 4 0 0 0-4 4v20a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V8a4 4 0 0 0-4-4Z"
    />
  </svg>
);
export default TaskIcon;
