import Skeleton from "react-loading-skeleton";
export const AboutSkeleton = () => {
  return (
    <div style={{ backgroundColor: "black", padding: "25px 70px" }}>
      <div style={{ display: "flex" }}>
        <Skeleton
          width={450}
          height={550}
          baseColor="#2C2C2C"
          highlightColor="#474747"
        ></Skeleton>
        <div style={{ marginLeft: "50px" }}>
          <Skeleton
            width={750}
            height={70}
            baseColor="#2C2C2C"
            highlightColor="#474747"
          ></Skeleton>
          <Skeleton
            width={750}
            height={400}
            baseColor="#2C2C2C"
            highlightColor="#474747"
          ></Skeleton>
          <Skeleton
            width={400}
            height={70}
            baseColor="#2C2C2C"
            highlightColor="#474747"
          ></Skeleton>
        </div>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Skeleton
          width={1350}
          height={200}
          baseColor="#2C2C2C"
          highlightColor="#474747"
        ></Skeleton>
      </div>
    </div>
  );
};
