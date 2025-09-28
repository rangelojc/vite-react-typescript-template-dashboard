import CustomHelmet from "@/components/CustomHelmet";
import {
  ContentBox,
  ContentHeader,
  ContentTitle,
  Wrapper,
} from "@/components/LayoutWidgets";

const Empty = () => {
  return (
    <Wrapper>
      <CustomHelmet title={"Empty"} />
      <ContentTitle text={"Empty"} />
      <ContentBox>
        <ContentHeader></ContentHeader>
      </ContentBox>
    </Wrapper>
  );
};

export default Empty;
