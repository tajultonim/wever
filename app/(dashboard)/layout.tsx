import { ReactNode } from "react";
import { Layout } from "@/components/layout/layout";
import { ProfileSidebar } from "@/components/layout/sidebar/profile-sidebar";
import { OptionsSidebar } from "@/components/layout/sidebar/options-sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Layout RightSidebar={ProfileSidebar} LeftSidebar={OptionsSidebar}>
      {children}
    </Layout>
  );
}
