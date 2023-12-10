# Frontend Engineer Assignment

To install, run `yarn`
To run the test suite, run `yarn test`

Deployed application: https://denisebroekman.github.io/posts/

# Original assignment:

## Technology and frameworks

We use **Vue 2/3.** But if you prefer to use other frameworks (e.g. React), feel free to set up the assignment with your tools of choice.

We also use **Tailwind** for styling, but you can use vanilla CSS or any framework of your choice.

Finally, we prefer to use **TypeScript**, so it is a plus for you to showcase the use of it, but you are allowed to use any Javascript flavor.

## Assignment: Sortable post list

Please see the following screenshot for the design to build.

![Untitled](https://temper.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fe7d34d66-3d57-486e-a824-2109a58aba6e%2FUntitled.png?table=block&id=b64d1385-d969-424e-981f-d42547fbd14d&spaceId=3a24cf7a-a13a-40ee-9ded-f4d63d8c2d5a&width=2000&userId=&cache=v2)

### Business requirements

The left side component (post list) should load its initial state from https://jsonplaceholder.typicode.com/posts, allow the user to update the state via manipulating the UI, and emit the list of actions committed on the right side component (list of actions committed).

### Functional requirements

-   Only the first 5 posts should be displayed.
-   Cell titles should be named as `Post id`, where `id` is set by the `id` of a post on https://jsonplaceholder.typicode.com/posts, e.g. `Post 1`.
-   The order of the posts can be changed by clicking the up/down arrows.
-   When a user changes the order of the posts, the action should be added to the top of the “List of actions committed” component on the right.
    -   e.g. When a user moves the `Post 1` below `Post 2`, then an action card saying “Moved `Post 1` from `index 0` to `index 1`” should be added to the top of the list.
-   Users can can click on the “Time Travel” button on one of the action cards, which rewinds the order of the posts as it was before that action was taken. This action should also remove the clicked action card and the action cards above that.

### Non-functional requirements

**\*\*\*\***\*\***\*\*\*\***Usability**\*\*\*\***\*\***\*\*\*\***

It should be evident to the user how to operate the component. We are here to help the user to understand what are their options and guide them. This also includes pleasant and useful animations.

\***\*\*\*\*\***\*\*\***\*\*\*\*\***Testability\***\*\*\*\*\***\*\*\***\*\*\*\*\***

It is strongly recommended to write automated tests (unit or integration) to verify and document the business logic. We leave it up to you to decide which parts of the implementation should be covered by automated tests given the time constraints.

## Evaluation criteria

We will evaluate the assignment according to the following aspects:

-   Correctness: bug free implementation according to the requirements
-   Code quality: how clean, readable, organized and future proof your code is
-   Testing: how much confidence your automated tests add to the implementation
-   Visual implementation: how close your implementation is to the supplied design, and animations you provided

**Good luck! If you have any questions, feel free to reach out.**
