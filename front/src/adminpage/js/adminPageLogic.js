import { useState, useEffect } from "react";

export function useFilteredData(queryParams) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        // 여기서 필요한 형태로 데이터 변환
        const payload = {
            data_type: "table_filtering",
            data:{
                filtering: queryParams.filters,
                ...(queryParams.sort?.direction
                    ? { sorting: queryParams.sort.direction === "desc"
                        ? "-" + queryParams.sort.key
                        : queryParams.sort.key
                    }
                    : {})
            }
        };
        console.log("보내는 payload:", JSON.stringify(payload, null, 2));
        const res = await fetch("http://127.0.0.1:8000/api/items/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),  // 변환된 payload만 보냄
        });

        const result = await res.json();
        setData(result);
        console.log(result)
      } catch (err) {
        console.error("서버 요청 실패:", err);
      }
    };

    fetchFilteredData();
  }, [queryParams]);

  return data;
}
