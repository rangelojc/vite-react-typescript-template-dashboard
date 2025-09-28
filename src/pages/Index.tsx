import CustomHelmet from "@/components/CustomHelmet";
import {
  ContentBox,
  ContentHeader,
  ContentTitle,
  PageHeader,
  Wrapper,
} from "@/components/LayoutWidgets";
import { MobileSidebarButton } from "@/features/Sidebar/Sidebar";

const Index = () => {
  return (
    <Wrapper>
      <CustomHelmet title={"Home"} />

      <PageHeader>
        <MobileSidebarButton />
        <ContentTitle text={"Home"} />
      </PageHeader>

      <ContentBox className="p-0 !pr-2 !bg-transparent !rounded-none !border-none overflow-auto !shadow-none">
        <ContentHeader></ContentHeader>
      </ContentBox>
    </Wrapper>
  );
};

export default Index;
