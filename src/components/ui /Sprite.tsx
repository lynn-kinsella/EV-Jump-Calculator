interface SpriteProps {
    url: string | undefined;
    size: "sm" | "lg";
    offset: { w: number; h: number }
    spriteName: string
}

function Sprite({ url, size, spriteName, offset: scaling = { w: 256, h: 256 } }: SpriteProps) {
    const dims = size == "sm" ? 12 : 36;
    return (
        <div className="flex flex-col justify-end items-center border-gray-400 border-solid border" style={{ width: dims + "rem", height: dims + "rem" }}>
            <img className="" style={{ width: 100 * scaling.w / 256 + "%", height: 100 * scaling.h / 256 + "%" }}
                src={url}
                alt={`Loading ${spriteName} Sprite...`} />
        </div>
    )
}

export default Sprite