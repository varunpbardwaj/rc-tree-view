import React from "react";

const input = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";

function idGenerator(length: number) {
  let result = "";
  for (let i = length; i > 0; i -= 1) {
    result += input[Math.floor(Math.random() * input.length)];
  }
  return result;
}

function RenderLogs(data: any, isChild: boolean) {
  const arr = Object.keys(data).map((key) => {
    if (data[key] && typeof data[key] === "object") {
      const id = idGenerator(10);
      return (
        <div
          key={key}
          style={{
            margin: isChild ? "5px 0px" : "5px 0px 0px 0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <span
              onClick={() => {
                if (document.getElementById(`parent-${id}`).innerText === "▷") {
                  document.getElementById(`parent-${id}`).innerText = "▽";
                  document.getElementById(`child-${id}`).style.display =
                    "block";
                } else {
                  document.getElementById(`parent-${id}`).innerText = "▷";
                  document.getElementById(`child-${id}`).style.display = "none";
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <span id={`parent-${id}`}>▷</span> <span>{key}</span>
            </span>
          </div>
          <div
            id={`child-${id}`}
            style={{
              display: "none",
              margin: "0px 0px 0px 15px",
            }}
          >
            {RenderLogs(data[key], true)}
          </div>
        </div>
      );
    } else {
      return (
        <div key={key} style={{ marginTop: "5px" }}>
          {key !== "logger_flagr" && (
            <div style={{ display: "flex" }}>
              <div>{key}: </div>
              <div
                title={data[key] ? data[key].toString() : "null"}
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginLeft: "8px",
                  cursor: "pointer",
                }}
              >
                {data[key] ? data[key].toString() : "null"}
              </div>
            </div>
          )}
        </div>
      );
    }
  });
  return arr;
}

const JsonView = ({
  data,
  theme = {
    fg: "#202020",
    bg: "#FAFAFA",
    size: "12px",
  },
  width = "200px",
  height = "100vh",
  shadow = false,
}: {
  data: any;
  theme?: {
    fg: string;
    bg: string;
    size: string;
  };
  width?: string;
  height?: string;
  shadow?: boolean;
}) => {
  return (
    <div
      style={{
        paddingLeft: "10px",
        paddingRight: "10px",
        width: width,
        height: height,
        backgroundColor: theme.bg,
        color: theme.fg,
        overflowX: "hidden",
        overflowY: "hidden",
        fontSize: theme.size,
        fontWeight: 600,
        userSelect: "none",
        boxShadow: shadow
          ? "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
          : "",
      }}
    >
      {RenderLogs(data, false)}
    </div>
  );
};

export default JsonView;
