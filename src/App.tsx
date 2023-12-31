import { For, createEffect, createSignal } from "solid-js"
import OpenFile from "./OpenFile"
import { createStore } from "solid-js/store"

interface DataType {
    [key: string]: {
        text: string
        categories: {
            [key: string]: string | null
        }
        moralities: {
            [key: string]: boolean
        }
        values: {
            [key: string]: {
                reason: string
            }
        }
    }
}

interface ValueType {
    [category: string]: {
        [subCategory: string]: string[];
    };
}


export default function App() {

    const humanValues: ValueType = {
        "Self-direction: thought": {
            "Be creative": [
                "allowing for more creativity or imagination",
                "being more creative",
                "fostering creativity",
                "promoting imagination"
            ],
            "Be curious": [
                "being the more interesting option",
                "fostering curiosity",
                "making people more keen to learn",
                "promoting discoveries",
                "sparking interest"
            ],
            "Have freedom of thought": [
                "allowing people to figure things out on their own",
                "allowing people to make up their mind",
                "resulting in less censorship",
                "resulting in less influence on people's thoughts"
            ]
        },
        "Self-direction: action": {
            "Be choosing own goals": [
                "allowing people to choose what is best for them",
                "allowing people to decide on their life",
                "allowing people to follow their dreams"
            ],
            "Be independent": [
                "allowing people to plan on their own",
                "resulting in fewer times people have to ask for consent"
            ],
            "Have freedom of action": [
                "allowing people to be self-determined",
                "allowing people to do things even though this may hurt them in the long run",
                "resulting in more times people can do what they want"
            ],
            "Have privacy": [
                "allowing for private spaces",
                "allowing for time alone",
                "resulting in less surveillance",
                "resulting in more control on what to disclose and to whom"
            ]
        },
        "Stimulation": {
            "Have an exciting life": [
                "allowing people to experience foreign places",
                "providing perspective-changing experiences",
                "providing special activities"
            ],
            "Have a varied life": [
                "allowing people to change parts of their life",
                "allowing people to move flat easily",
                "promoting local clubs (sports, ...)",
                "providing many activities"
            ],
            "Be daring": [
                "allowing for risky actions",
                "allowing to take risks",
                "being more risky",
                "fostering risk-taking"
            ]
        },
        "Hedonism": {
            "Have pleasure": [
                "making life enjoyable",
                "providing leisure",
                "providing opportunities to have fun",
                "providing sensuous gratification"
            ]
        },
        "Achievement": {
            "Be ambitious": [
                "allowing for ambitions",
                "being more ambitious",
                "fostering ambition",
                "providing incentives for the difficult climb up the social ladder"
            ],
            "Have success": [
                "allowing for success",
                "being more successful",
                "recognizing achievements"
            ],
            "Be capable": [
                "allowing to acquire competence in certain tasks",
                "being more effective",
                "resulting in a higher effectivity",
                "showing competence in solving tasks"
            ],
            "Be intellectual": [
                "allowing to acquire high cognitive skills",
                "being more reflective",
                "resulting in more reflective behavior",
                "showing intelligence"
            ],
            "Be courageous": [
                "being more courageous",
                "fostering courage",
                "making people stand up for their beliefs",
                "promoting courage",
                "showing courage"
            ]
        },
        "Power: dominance": {
            "Have influence": [
                "having more people to ask for a favor",
                "resulting in more influence",
                "resulting in more obligations towards the own side",
                "resulting in more ways to control events"
            ],
            "Have the right to command": [
                "allowing experts to tell others what to do",
                "allowing people to take command",
                "fostering leadership",
                "resulting in clearer hierarchies of command"
            ]
        },
        "Power: resources": {
            "Have wealth": [
                "allowing people to gain wealth and material possession",
                "allowing to show one's wealth",
                "allowing to use money for power",
                "providing people with resources to control events",
                "resulting in financial prosperity"
            ]
        },
        "Face": {
            "Have social recognition": [
                "allowing people to gain respect",
                "avoiding humiliation",
                "providing social recognition for actions"
            ],
            "Have a good reputation": [
                "allowing people to build up their reputation",
                "protecting one's public image",
                "spreading reputation"
            ]
        },
        "Security: personal": {
            "Have a sense of belonging": [
                "allowing people to establish groups",
                "allowing people to join groups and show their group membership",
                "allowing group members to show they care for each other",
                "fostering a sense of belonging",
                "resulting in fewer people forced to leave their groups"
            ],
            "Have good health": [
                "avoiding diseases",
                "preserving health",
                "having physiological and mental well-being",
                "fostering activities to stay healthy",
                "resulting in increased health"
            ],
            "Have no debts": [
                "avoiding indebtedness",
                "having people always return a favor",
                "reciprocating favors"
            ],
            "Be neat and tidy": [
                "allowing to clean up",
                "being more clean or orderly",
                "promoting cleanliness or neatness",
                "resulting in higher cleanliness"
            ],
            "Have a comfortable life": [
                "providing subsistence income",
                "resulting in having no financial worries",
                "resulting in a higher general happiness",
                "resulting in a prosperous life"
            ]
        },
        "Security: societal": {
            "Have a safe country": [
                "caring for citizens",
                "resulting in a state that can better act on crimes",
                "resulting in a state that can better defend its citizens",
                "resulting in a state that takes better care of its citizens",
                "resulting in a stronger state"
            ],
            "Have a stable society": [
                "accepting or maintaining the existing social structure",
                "preventing chaos and disorder",
                "promoting the social order",
                "resulting in a country that is more stable"
            ]
        },
        "Tradition": {
            "Be respecting traditions": [
                "allowing to follow one's family's customs",
                "honoring traditional practices",
                "maintaining traditional values and ways of thinking",
                "promoting the preservation of customs"
            ],
            "Be holding religious faith": [
                "allowing to devote one's life to their faith",
                "allowing the customs of a religion",
                "being more adequate for a certain religion",
                "promoting piety",
                "spreading a religion"
            ]
        },
        "Conformity: rules": {
            "Be compliant": [
                "abiding to laws or rules",
                "promoting to meet one's obligations",
                "recognizing people who abide to laws or rules"
            ],
            "Be self-disciplined": [
                "fostering to exercise restraint",
                "fostering to follow rules even when no-one is watching",
                "fostering to set rules for oneself"
            ],
            "Be behaving properly": [
                "avoiding to violate informal rules or social conventions",
                "fostering good manners",
                "resulting in more people minding their manners"
            ]
        },
        "Conformity: interpersonal": {
            "Be polite": [
                "avoiding to upset other people",
                "promoting to take others into account",
                "resulting in being less annoying for others"
            ],
            "Be honoring elders": [
                "fostering that children follow their parents",
                "showing faith and respect towards one's elders"
            ]
        },
        "Humility": {
            "Be humble": [
                "demoting arrogance",
                "demoting to think one deserves more than other people",
                "emphasizing the successful group over single persons",
                "fostering to give back to society for the opportunities one got",
                "fostering to not brag about what one achieved"
            ],
            "Have life accepted as is": [
                "allowing people to accept their fate",
                "fostering to submit to life's circumstances",
                "promoting satisfaction with what one has",
                "showing acceptance of one's own portion in life"
            ]
        },
        "Benevolence: caring": {
            "Be helpful": [
                "allowing to help the people in one's group",
                "being more helpful to those one cares for",
                "fostering a readiness to help each other",
                "promoting to work for the welfare of others in one group"
            ],
            "Be honest": [
                "being more honest",
                "fostering honest ways of thinking",
                "promoting honesty",
                "recognizing people for their honesty",
                "resulting in more honest social interaction"
            ],
            "Be forgiving": [
                "allowing people to forgive each other",
                "giving people a second chance",
                "being merciful",
                "promoting a will to pardon others",
                "providing paths to redemption"
            ],
            "Have the own family secured": [
                "allowing people to protect their family",
                "promoting to have a family",
                "providing care for one's family"
            ],
            "Be loving": [
                "allowing to place the well-being of others above the own well-being",
                "allowing to show one's affection, compassion and sympathy",
                "fostering close relationships",
                "promoting self-respect and self-love as a means of care for oneself",
                "promoting to concern oneself with the needs of dear ones"
            ]
        },
        "Benevolence: dependability": {
            "Be responsible": [
                "allowing for clear responsibilities",
                "fostering dependability",
                "promoting reliability",
                "resulting in more people being confident",
                "taking responsibility"
            ],
            "Have loyalty towards friends": [
                "being a dependable and trustworthy friend",
                "foster loyalty towards friends",
                "promoting to give friends a full backing"
            ]
        },
        "Universalism: concern": {
            "Have equality": [
                "fostering people of a lower social status",
                "helping poorer regions of the world",
                "providing all people with equal opportunities in life",
                "resulting in a world were success is less determined by birth"
            ],
            "Be just": [
                "allowing justice to be 'blind' to irrelevant aspects of a case",
                "fostering a sense for justice",
                "promoting fairness in competitions",
                "protecting the weak and vulnerable in society",
                "resulting a world were people are less discriminated based on race, gender, ..."
            ],
            "Have a world at peace": [
                "allowing for nations to cease fire",
                "avoiding conflicts",
                "fostering to see peace as fragile and precious",
                "promoting to end wars",
                "resulting in more people caring for all of humanity"
            ]
        },
        "Universalism: nature": {
            "Be protecting the environment": [
                "avoiding pollution",
                "fostering to care for nature",
                "promoting programs to restore nature",
                "resulting in less damage to the ecosystem"
            ],
            "Have harmony with nature": [
                "allowing to avoid chemicals (especially in nutrition)",
                "allowing to avoid genetically modified organisms",
                "fostering to treat animals or plants like them having souls",
                "promoting a life in harmony with nature",
                "resulting in more people reflecting the consequences of their actions towards the environment"
            ],
            "Have a world of beauty": [
                "allowing people to experience art",
                "fostering to stand in awe of nature",
                "promoting fine arts",
                "promoting the beauty of nature",
                "spreading beauty"
            ]
        },
        "Universalism: tolerance": {
            "Be broadminded": [
                "allowing for discussion between groups",
                "clearing up with prejudices",
                "fostering to listen to and understand people who are different from oneself",
                "promoting tolerance towards all kinds of people and groups",
                "promoting to life within a different group for some time"
            ],
            "Have the wisdom to accept others": [
                "allowing people to accept disagreements",
                "fostering to accept people even when one disagrees with them",
                "promoting a mature understanding of different opinions",
                "resulting in fewer partisans or fanatics"
            ]
        },
        "Universalism: objectivity": {
            "Be logical": [
                "being better by the numbers but not by gut feeling",
                "fostering a rational way of thinking",
                "promoting focus and consistency",
                "promoting the rational analysis of circumstances",
                "promoting the scientific method"
            ],
            "Have an objective view": [
                "fostering to seek the truth",
                "fostering to take on a neutral perspective",
                "promoting to form an unbiased opinion",
                "providing people with the means to make informed decisions",
                "weighing all pros and cons"
            ]
        }
    }

    const humanValuesKeys = Object.keys(humanValues)

    const [content, setContent] = createSignal("{}")
    const [data, setData] = createStore<DataType>({})
    const [keys, setKeys] = createSignal(["F1"])
    const [idx, setIdx] = createSignal(0)
    const [valueIdx, setValueIdx] = createSignal(0)

    createEffect(() => {
        const newContent = content()
        setData(JSON.parse(newContent))
        setKeys(Object.keys(data))
    })
    document.onkeyup = (e) => {
        if (e.ctrlKey) {
            if (e.code === "ArrowLeft") {
                const l = keys().length
                setIdx(x => x === 0 ? l - 1 : x - 1)
            } else if (e.code === "ArrowRight") {
                const l = keys().length
                setIdx(x => (x + 1) % l)
            } else if (e.code === "ArrowUp") {
                setValueIdx(x => x === 0 ? humanValuesKeys.length - 1 : x - 1)
            } else if (e.code === "ArrowDown") {
                setValueIdx(x => (x + 1) % humanValuesKeys.length)
            }
        }
    }

    const extractValueContent = () => {
        const curValue = humanValuesKeys[valueIdx()]
        const valueContent = humanValues[curValue]
        const contentKeys = Object.keys(valueContent)
        return (
            <>
                <span class="text-l font-bold">{curValue}</span>
                <ul class="list-disc ml-8 font-bold">
                    <For each={contentKeys}>{
                        key =>
                            <li>
                                {key}
                                <ul class="list-item ml-8 font-normal">
                                    <For each={valueContent[key]}>{
                                        v =>
                                            <li>
                                                {v}
                                            </li>
                                    }
                                    </For>
                                </ul>
                            </li>
                    }
                    </For>
                </ul>
            </>
        )
    }

    const setReason = (reason: string) => {
        const key = keys()[idx()]
        const humanValue = humanValuesKeys[valueIdx()]
        if (!key) {
            return
        }
        if (!data[key]["values"]) {
            setData(key, "values", {})
        }
        if (!data[key]["values"][humanValue]) {
            setData(key, "values", humanValue, {})
        }
        setData(key, "values", humanValue, "reason", reason)
    }

    return (
        <>
            <header>
                <OpenFile callback={setContent} saveDataProvider={() => JSON.stringify(data)} />
            </header>

            <div>
                Human Value: <input value={valueIdx()} onChange={e => {
                    const v = Number(e.target.value)
                    if (!isNaN(v)) {
                        if (v < 0) {
                            setValueIdx(0)
                        } else {
                            setValueIdx(v % humanValuesKeys.length)
                        }
                    }
                }} /> <br />
                {extractValueContent()}
            </div>
            <hr class="mb-4" />

            <div class="mx-8">
                <h1>
                    Content: <input value={idx()} onChange={e => {
                        const v = Number(e.target.value)
                        if (!isNaN(v)) {
                            if (v < 0) {
                                setIdx(0)
                            } else {
                                const l = keys().length
                                setIdx(v % l)
                            }
                        }
                    }} /> <br />
                    {keys()[idx()] ?? ""}: {data?.[keys()[idx()]]?.["text"] ?? ""}
                </h1>
            </div>
            <hr class="mb-4" />
            <div>
                <label>reason</label>
                <textarea
                    rows="8"
                    class="block p-4 w-full text-gray-900 bg-gray-100 rounded-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    onInput={e => setReason(e.target.value)}
                    value={data?.[keys()[idx()]]?.["values"]?.[humanValuesKeys[valueIdx()]]?.["reason"] ?? ""} />
            </div>
        </>
    )
}
