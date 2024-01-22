interface SpriteProps {
    url: string | undefined;
    variant: "sm" | "lg";
}

function Sprite({ url, variant }: SpriteProps) {
    const size = variant === "sm" ? 12 : 36;
    return (
        <div className={" h-auto" + size + " w-" + size}>
            <img className="h-[100%]"
                src={url}
                alt="Loading Sprite..." />
        </div>
    )
}

export default Sprite