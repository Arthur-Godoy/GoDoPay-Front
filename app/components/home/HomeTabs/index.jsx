import { useState } from "react";
import { Card, Divider, Tab, Tabs } from "@mui/material";
import SolicitationList from "~/components/home/SolicitationList";
import TransactionList from "~/components/home/TransactionList";

const TABS = {
  Statement: "statement",
  Sent: "sent",
  Received: "received",
};

export default function HomeTabs() {
  const [tab, setTab] = useState(TABS.Statement);

  return (
    <Card>
      <Tabs
        value={tab}
        onChange={(_, next) => setTab(next)}
        className="px-3 pt-1"
      >
        <Tab label="Extrato" value={TABS.Statement} />
        <Tab label="Solicitações enviadas" value={TABS.Sent} />
        <Tab label="Solicitações recebidas" value={TABS.Received} />
      </Tabs>

      <Divider />

      {tab === TABS.Statement ? (
        <TransactionList />
      ) : (
        <SolicitationList active direction={tab} />
      )}
    </Card>
  );
}
