import styled from "styled-components";

const Container = styled.div`
    border: 1px solid #eeeeee;
    border-radius: 2px;
`;

const Title = styled.div`
    border-bottom: 1px solid #eeeeee;
    padding: 12px;
    font-weight: 600;
    font-size: 16px;
    background: #fcfcfe;
`;

const Body = styled.div`
    padding: 12px;
`;

export default function Box({ title, children, ...props }) {
    return <Container {...props}>
        <Title>
            {title}
        </Title>
        <Body>
            {children}
        </Body>
    </Container>
}