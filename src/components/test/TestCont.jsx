import React from "react";

import Test from "./Test";

const TestContainer = React.memo((props) => {
  return (
    <div className="test-page">
      <Test />
    </div>
  );
});

export default TestContainer;
