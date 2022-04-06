import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line

import { SectionHeading, Subheading as SubheadingBase } from "../../components/misc/Headings.js";
import { SectionDescription } from "../../components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "../../components/misc/Layouts.js";

import { ReactComponent as ArrowRightIcon } from "../../assets/images/arrow-right-icon.svg";
import { ReactComponent as SvgDecoratorBlob3 } from "../../assets/images/svg-decorator-blob-3.svg";


import TaxiImage from "../../assets/images/Taxi-icon.svg";
import AmbulanceImage from "../../assets/images/Ambulance-icon.svg";
import HGVImage from "../../assets/images/HGV-icon.svg";

const Heading = tw(SectionHeading)``;
const Subheading = tw(SubheadingBase)`text-center mb-3`;
const Description = tw(SectionDescription)`text-center mx-auto`;
const ThreeColumnContainer = styled.div`
  ${tw`mt-10 flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap lg:justify-center max-w-screen-lg mx-auto`}
`;
const Column = styled.div`
  ${tw`lg:w-1/3 max-w-xs`}
`;

const Card = styled.a`
  ${tw`flex flex-col items-center text-center h-full mx-4 px-4 py-8 rounded transition-transform duration-300 hover:cursor-pointer transform hover:scale-105 `}
  .imageContainer {
    ${tw`text-center rounded-full p-4 bg-gray-100`}
    img {
      ${tw`w-8 h-8`}
    }
  }

  .title {
    ${tw`mt-4 font-bold text-xl leading-none`}
  }

  .description {
    ${tw`mt-4 text-sm font-medium text-secondary-300`}
  }

  .link {
    ${tw`mt-auto inline-flex items-center pt-5 text-sm font-bold text-primary-300 leading-none hocus:text-primary-900 transition duration-300`}
    .icon {
      ${tw`ml-2 w-4`}
    }
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-40`}
`;

export default ({
  appointmentTypes = [
    {
      imageSrc: HGVImage,
      title: "HGV Driver Medicals",
      description: "",
      url: ""
    },
    {
      imageSrc: TaxiImage,
      title: "Taxi Driver Medicals",
      description: "",
      url: ""
    },
    {
      imageSrc: AmbulanceImage,
      title: "Ambulance Driver Medicals",
      description: "",
      url: ""
    }
  ],
  linkText = "Learn More",
  heading = "",
  subheading = "",
  description = "",
  imageContainerCss = null,
  imageCss = null
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        {subheading && <Subheading>{subheading}</Subheading>}
        {heading && <Heading>{heading}</Heading>}
        {description && <Description>{description}</Description>}
        <ThreeColumnContainer>
          {appointmentTypes.map((appointmentType, i) => (
            <Column key={i}>
              <Card href={appointmentType.url}>
                <span className="imageContainer" css={imageContainerCss}>
                  <img src={appointmentType.imageSrc} alt="" css={imageCss} />
                </span>
                <span className="title">{appointmentType.title}</span>
                <p className="description">{appointmentType.description}</p>
                {linkText && (
                  <span className="link">
                    <span>{linkText}</span>
                    <ArrowRightIcon className="icon" />
                  </span>
                )}
              </Card>
            </Column>
          ))}
        </ThreeColumnContainer>
      </ContentWithPaddingXl>
      <DecoratorBlob />
    </Container>
  );
};
