import React, { useState } from "react";

const RenderChild = ({ drillData, theme, width, height, callback }: any) => {
  const [spread, setSpread] = useState(false);

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "auto",
        marginTop: "5px",
      }}
    >
      <div
        title={drillData.parent}
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        onClick={() => {
          if (drillData.children) {
            setSpread(!spread);
          }
          callback({
            flagr: drillData.parent,
            spread: !spread,
          });
        }}
      >
        {drillData.children && (
          <div
            style={{
              marginLeft: "5px",
              marginRight: "5px",
              transform: `rotate(${!spread ? "0deg" : "90deg"})`,
            }}
          >
            ▷
          </div>
        )}
        {drillData.parent}
      </div>
      {drillData.children && spread && (
        <div
          style={{
            cursor: "pointer",
            marginLeft: "28px",
          }}
        >
          {drillData.children.map(
            (drillChildData: any, drillChildIndex: number) => {
              return (
                <RenderChild
                  key={drillChildIndex}
                  drillData={drillChildData}
                  theme={theme}
                  width={width}
                  height={height}
                  callback={callback}
                />
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

const FolderView = ({
  data,
  theme = {
    fg: "#202020",
    bg: "#FAFAFA",
    size: "12px",
  },
  width = "200px",
  height = "100vh",
  shadow = false,
  callback,
}: {
  data: any;
  theme?: {
    fg: string;
    bg: string;
    size: string;
  };
  width?: string;
  height?: string;
  shadow: boolean;
  callback: () => void;
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        backgroundColor: theme.bg,
        color: theme.fg,
        overflowX: "hidden",
        overflowY: "hidden",
        fontSize: theme.size,
        fontWeight: 600,
        paddingLeft: "5px",
        paddingRight: "10px",
        userSelect: "none",
        boxShadow: shadow
          ? "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
          : "",
      }}
    >
      {
        <RenderChild
          drillData={data}
          theme={theme}
          width={width}
          height={height}
          callback={callback}
        />
      }
    </div>
  );
};

export default FolderView;
