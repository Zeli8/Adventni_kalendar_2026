import AdventCalendar from "../components/AdventCalendar";
import { freeCalendar } from "../calendars/free";

export default function Home() {
  return <AdventCalendar calendar={freeCalendar} />;
}