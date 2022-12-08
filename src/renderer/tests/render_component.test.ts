import { compile } from "component/compiler";
import { childNodesOf, parse, toHTML } from "dom/dom";
import { renderComponent } from "renderer/render_component";

describe("render_component", () => {
  it("simple", () => {
    const component = compile(
      "welcome-banner",
      "test.html",
      `<div class="header"><h1>Welcome</h1></div><p>Let's go</p>`
    );
    const output = renderComponent(component, [], []);

    expect(toHTML(output)).toBe(
      `<div class="header"><h1>Welcome</h1></div><p>Let's go</p>`
    );
  });

  it("with slots", () => {
    const component = compile(
      "welcome-banner",
      "test.html",
      `<div class="header"><h1><slot name="header"/></h1></div><p><slot /></p>`
    );
    const output = renderComponent(
      component,
      [],
      [
        ...childNodesOf(
          parse(`<template slot="header">Hello</template>What's up?`)
        ),
      ]
    );

    expect(toHTML(output)).toBe(
      `<div class="header"><h1>Hello</h1></div><p>What's up?</p>`
    );
  });
});
