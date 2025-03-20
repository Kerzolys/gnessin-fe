import { Event } from "../../modules/event/event"
import { Hero } from "../../modules/hero/hero"
import { Layout } from "../../modules/layout/layout"

export const EventPage = () => {
    return (
        <Layout>
            <Hero />
            <Event />
        </Layout>
    )
}