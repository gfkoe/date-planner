export default function AboutPage() {
  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="flex flex-auto justify-center items-center">
        <div className="w-2/5 border border-black px-4 py-4">
          <div className="text-3xl">About DatePlanner</div>
          <br />
          <div>
            The idea for this application came from my relationship with my
            lovely girlfriend, and the challenges that we faced with having
            consistent dates planned.
          </div>
          <div>
            My goal with DatePlanner is to try to solve a common problem in many
            kinds of relationships: How can we better plan and share events?
          </div>
          <div>
            The goal of DatePlanner it to make it easier for people to plan
            events, whether that be a party with friends, a group outing, or a
            date with a significant other.
          </div>
        </div>
      </div>
    </div>
  );
}
