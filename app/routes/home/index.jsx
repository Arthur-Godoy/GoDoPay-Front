import { Box } from "@mui/material";
import BalanceCard from "~/components/home/BalanceCard";
import QuickActions from "~/components/home/QuickActions";
import HomeTabs from "~/components/home/HomeTabs";

export default function Home() {
  return (
    <Box className="mx-auto flex w-full max-w-[1100px] flex-col gap-5">
      <BalanceCard />

      <QuickActions />

      <HomeTabs />
    </Box>
  );
}
