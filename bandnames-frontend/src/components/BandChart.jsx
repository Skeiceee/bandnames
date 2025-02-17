import { useContext, useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { SocketContext } from "../context/SocketContext";

Chart.register(...registerables);

const BandChart = () => {
  const { socket } = useContext( SocketContext );
  const chartRef = useRef(null);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      crearGrafica(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const crearGrafica = (bands = []) => {

    const data = {

      labels: bands.map((band) => { return band.name; }),

      datasets: [
        {
          label: "# of Votes",
          data: bands.map((band) => { return band.votes; }),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],

    };

    const config = {
      type: "bar",
      data,
      options: {
        animation: false,
        indexAxis: "y",
        scale: {
          x: {
            beginAtZero: true,
          },
        },
      },
    };

    if (chartRef.current) {
        chartRef.current.destroy();
    }

    chartRef.current = new Chart(document.getElementById("myChart"), config);
  };

  return <canvas id="myChart"></canvas>;
};

export default BandChart;
