import moment from 'moment'
import { useEffect, useRef, useState } from "react";

import PageContainer from "@/components/PageContainer";

const PortalIndexPage = () => {

  const [now, setNow] = useState<number>(new Date().valueOf())
  const intervalRef = useRef<any>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setNow(new Date().valueOf())
    }, 1000)
  }, [])


  return (
    <PageContainer>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <h2 style={{fontSize: 40, marginBottom: 36}}>Welcome !</h2>
        <h3 style={{fontSize: 32}}>{moment(now).format('YYYY-MM-DD HH:mm:ss')}</h3>
      </div>
    </PageContainer>
  );
};

export default PortalIndexPage;
