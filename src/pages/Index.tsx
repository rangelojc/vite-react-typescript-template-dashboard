import CustomHelmet from "@/components/CustomHelmet";
import {
  ContentBox,
  ContentHeader,
  ContentTitle,
  Wrapper,
} from "@/components/LayoutWidgets";

const Index = () => {
  return (
    <Wrapper>
      <CustomHelmet title={"Home"} />
      <ContentTitle text={"Home"} />
      <ContentBox className="p-0 !pr-2 !bg-transparent !rounded-none !border-none overflow-auto !shadow-none">
        <ContentHeader></ContentHeader>
      </ContentBox>
    </Wrapper>
  );
};

export default Index;
