<script lang="ts">
	import SplitPane from "./SplitPane.svelte";
	import { createPopper } from "@popperjs/core";
	export let name: string;

	//Tabs Logic
	let openTab = 1;
	function toggleTabs(tabNumber) {
		openTab = tabNumber;
	}

	//Dropdown Logic
	// library for creating dropdown menu appear on click
	

	// core components

	let dropdownPopoverShow = false;

	let btnDropdownRef;
	let popoverDropdownRef;

	const toggleDropdown = () => {
		if (dropdownPopoverShow) {
			dropdownPopoverShow = false;
		} else {
			dropdownPopoverShow = true;
			createPopper(btnDropdownRef, popoverDropdownRef, {
				placement: "right",
			});
		}
	};
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>

	<SplitPane>
		<div id="left" slot="left">
			<div class="flex flex-wrap">
				<div class="w-full">
					<ul
						class="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
					>
						<li
							class="rounded bg-orange-500 -mb-px mr-2 last:mr-0 flex-auto text-center"
						>
							<div
								class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
								1
									? 'text-white bg-orange-600'
									: 'text-orange-600 bg-white'}"
								on:click={() => toggleTabs(1)}
							>
								Mo
							</div>
						</li>
						<li
							class="rounded bg-orange-500 -mb-px mr-2 last:mr-0 flex-auto text-center"
						>
							<div
								class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
								2
									? 'text-white bg-orange-600'
									: 'text-orange-600 bg-white'}"
								on:click={() => toggleTabs(2)}
							>
								Di
							</div>
						</li>
						<li
							class="rounded bg-orange-500 -mb-px mr-2 last:mr-0 flex-auto text-center"
						>
							<div
								class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
								3
									? 'text-white bg-orange-600'
									: 'text-orange-600 bg-white'}"
								on:click={() => toggleTabs(3)}
							>
								Mi
							</div>
						</li>
						<li
							class="rounded bg-orange-500 -mb-px mr-2 last:mr-0 flex-auto text-center"
						>
							<div
								class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
								4
									? 'text-white bg-orange-600'
									: 'text-orange-600 bg-white'}"
								on:click={() => toggleTabs(4)}
							>
								Do
							</div>
						</li>
						<li
							class="rounded bg-orange-500 -mb-px mr-2 last:mr-0 flex-auto text-center"
						>
							<div
								class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
								5
									? 'text-white bg-orange-600'
									: 'text-orange-600 bg-white'}"
								on:click={() => toggleTabs(5)}
							>
								Fr
							</div>
						</li>
						<li
							class="rounded bg-orange-500 -mb-px mr-2 last:mr-0 flex-auto text-center"
						>
							<div
								class="text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal {openTab ===
								6
									? 'text-white bg-orange-600'
									: 'text-orange-600 bg-white'}"
								on:click={() => toggleTabs(6)}
							>
								Sa
							</div>
						</li>
					</ul>
					<div
						class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
					>
						<div class="px-4 py-5 flex-auto">
							<div class="tab-content tab-space">
								<div
									class={openTab === 1 ? "block" : "hidden"}
									>
									<div class="flex flex-wrap">
										<div class="w-full sm:w-6/12 md:w-4/12 px-4">
										  <div class="relative  align-middle w-full">
											<button class="text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-orange-500 active:bg-orange-600 ease-linear transition-all duration-150" type="button" bind:this="{btnDropdownRef}"
											on:click="{toggleDropdown}">
											  orange Dropdown
											</button>
											<div bind:this="{popoverDropdownRef}" class="overflow-auto bg-orange-500  text-base float-right py-2 list-none text-left rounded shadow-lg mt-1 min-w-48 {dropdownPopoverShow ? 'block':'hidden'}">
											  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
												Action
											  </a>
											  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
												Another action
											  </a>
											  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
												Something else here
											  </a>
											  <div class="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
											  <a href="#pablo" class="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-white">
												Seprated link
											  </a>
											</div>
										  </div>
										</div>
									  </div>
									</div>

								<div class={openTab === 2 ? "block" : "hidden"}>
									<p>
										Completely synergize resource taxing
										relationships via premier niche markets.
										Professionally cultivate one-to-one
										customer service with robust ideas.
										<br />
										<br />
										Dynamically innovate resource-leveling customer
										service for state of the art customer service.
									</p>
								</div>
								<div class={openTab === 3 ? "block" : "hidden"}>
									<p>
										Efficiently unleash cross-media
										information without cross-media value.
										Quickly maximize timely deliverables for
										real-time schemas.
										<br />
										<br />
										Dramatically maintain clicks-and-mortar solutions
										without functional solutions.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="right" slot="right">
			<div class="mb-3 pt-0">
				<input
					type="text"
					placeholder="Regular Input"
					class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
				/>
			</div>
		</div>
	</SplitPane>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
