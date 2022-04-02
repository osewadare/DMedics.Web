import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import { SectionHeading } from "../misc/Headings.js";
import { ReactComponent as SvgDecoratorBlob3 } from "../../assets/images/logo.svg";
import addImage from "../../assets/images/add-icon.svg";
import viewImage from "../../assets/images/view-icon.svg";

const Container = tw.div`relative`;
const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-20 md:py-24`}
`;
const Heading = tw(SectionHeading)`w-full`;
const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;
const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xs items-center px-6 py-10 border-2 border-dashed border-primary-500 rounded-lg mt-12`}
  .imageContainer {
    ${tw`border-2 border-primary-500 text-center rounded-full p-6 flex-shrink-0 relative`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .textContainer {
    ${tw`mt-6 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-primary-500`}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;
const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;

export default function dashboardMain() {
  const cards = [
    { imageSrc: addImage, title: "Create Appointment" },
    { imageSrc: viewImage, title: "View Appointments" },
  ];
  return (
    <Container>
      <ThreeColumnContainer>
        <Heading>Admin <span tw="text-primary-500">Dashboard</span></Heading>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc} alt="" />
              </span>
              <span className="textContainer">
                <span className="title">{card.title}</span>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob />
    </Container>
  );
};

