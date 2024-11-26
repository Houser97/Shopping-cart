interface Props {
    image: string;
    product: string;
    onSeeMore: () => void;
    isInitialRender: boolean;
}

export const CarouselItem = ({ image, product, onSeeMore, isInitialRender }: Props) => {
    return (
        <div className={`item ${isInitialRender && 'initial-animation'}`}>
            <img src={image} alt="carousel item" />
            <div className="introduce">
                <div className="title">DESIGN SLIDER</div>
                <div className="topic">{product}</div>
                <div className="des">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, laborum cumque dignissimos quidem atque et eligendi aperiam voluptates beatae maxime.
                </div>
                <button className="seeMore" onClick={onSeeMore}>SEE MORE</button>
            </div>
            <div className="detail">
                <div className="title">{product}</div>
                <div className="des">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, reiciendis suscipit nobis nulla animi, modi explicabo quod corrupti impedit illo, accusantium in eaque nam quia adipisci aut distinctio porro eligendi. Reprehenderit nostrum consequuntur ea! Accusamus architecto dolores modi ducimus facilis quas voluptatibus! Tempora ratione accusantium magnam nulla tenetur autem beatae.
                </div>
            </div>
        </div>
    );
};