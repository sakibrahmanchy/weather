const Summary: React.FC<Partial<Summary>> = ({
    icon = "",
    title = "",
    description = ""
}) => (
    <div>
        <img className="m-auto" height="100" width="100" src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} />
        <figcaption className="text-2xl">{title}</figcaption>
        <span>{description}</span>
    </div>
)

export default Summary;