interface GraphItemProps {
  indexProps: number;
  widthProps: number;
}

function GraphItem(props: GraphItemProps) {
  return (
    <div className="graph-item">
      <div className="attempt-number">{props.indexProps}</div>
      <div className="attempt-stat">
        <div className="attempt-bar" style={{ width: props.widthProps + "%" }}>
          {props.widthProps}
        </div>
      </div>
    </div>
  );
}

export default GraphItem;
