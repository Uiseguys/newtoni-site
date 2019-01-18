export const ProductFragment = graphql`
  fragment ProductFragment on Wine {
    type
    id
    name
    image
    price
    priority
    content
    availability
    description
  }
`;
