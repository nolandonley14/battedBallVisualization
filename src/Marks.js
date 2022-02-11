export const Marks = ({data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius, colors }) => {

  const video = (link) => {
    window.open(link);
  };

  return (
      data.map((d, i) => (
      <circle
        key={i}
        className="mark"
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        onClick={() => video(d.VIDEO_LINK)}
        style={{'cursor':'pointer', 'fill':colors[d.PLAY_OUTCOME]}}
      >
        <title>{tooltipFormat(d.BATTER + " v " + d.PITCHER + " on " + d.GAME_DATE)}</title>
      </circle>
    ))
  );
}
