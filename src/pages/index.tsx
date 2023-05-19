import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [localValue, setLocalValue] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);

  const addToLog = useCallback(
    (log: any) => {
      setLogs([log, ...logs]);
    },
    [setLogs, logs]
  );

  const handleRetrieveValue = useCallback(
    (isAuto?: boolean) => {
      const retrievedValue = localStorage.getItem("kronos");
      setLocalValue(retrievedValue);
      const logData: any = { date: new Date(), value: retrievedValue };

      if (isAuto) {
        logData.isAuto = isAuto;
      }

      addToLog(logData);
    },
    [addToLog]
  );

  useEffect(() => {
    setTimeout(() => handleRetrieveValue(true), 3000)
  }, [])

  return (
    <>
      <div>
        <h1>retrieve values test</h1>
        <button onClick={() => handleRetrieveValue()}>retrieve</button>
        <p>value: </p>
        <p>{String(localValue)}</p>
        <h3>logs</h3>
        <ul>
          {logs.map((log) => (
            <li key={log.date.getTime()}>
              <span>
                {log.isAuto ? "[AUTOMATIC]" : ""} value: {String(log.value)} -{" "}
                {log.date.toString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
