import React from "react";

function BlogHeader() {
  return (
    <div className=" text-light text-center py-5 possition-fixed pb-5"  
    style={{ backgroundColor: "#115788", color: "white", overflow: "auto"}}>
      <div className="container"style={{marginTop:"80px"}} >
        <h1 className="fw-bold" >
          Stay ahead with the latest <br />
          <span className="text-secondary" style={{fontFamily:"Inter",
           fontWeight:700,
            FontSize:"80px",
            LineHeight:"96px",
            Color:"rgb(107, 114, 128)"}}> in SEO and Link Building</span>
        </h1>
        <p className="mt-4 fs-5">
          Insights, strategies, and expert advice to <br />
          power your online success
        </p>
      </div>
    </div>
  );
}

export default BlogHeader;
