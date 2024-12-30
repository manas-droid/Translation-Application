import { Example } from "./api/linguee.translation.interface"


interface ExampleInfo{
    examples: Example[] | undefined
}

const LingueeExamples:React.FC<ExampleInfo> = ({examples})=>{
    return (
        <>
        { examples && examples.length > 0 && (
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Examples:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {examples.map((example, index) => (
                    <li key={index} className="text-gray-700">
                      {example.src && (
                        <p>
                          <strong>Original:</strong> {example.src}
                        </p>
                      )}
                      {example.dst && (
                        <p>
                          <strong>Translation:</strong> {example.dst}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </>
    )
}


export default LingueeExamples