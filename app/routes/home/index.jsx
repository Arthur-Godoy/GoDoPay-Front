import { Box } from "@mui/material";
import BalanceCard from "~/components/home/BalanceCard";
import QuickActions from "~/components/home/QuickActions";
import TransactionList from "~/components/home/TransactionList";

export default function Home() {
  return (
    <Box className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <BalanceCard />

      <QuickActions />

      <TransactionList />
    </Box>
  );
}
