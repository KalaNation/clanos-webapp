'use client';

import { CheckIcon, EllipsisIcon, LockIcon, MenuIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import type * as React from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Badge, type BadgeVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const STATUS_BADGES: BadgeVariant[] = [
  'active',
  'pending',
  'suspended',
  'removed',
  'accepted',
  'declined',
  'expired',
  'revoked',
  'unverified',
  'locked',
];
const CONTENT_BADGES: BadgeVariant[] = [
  'draft',
  'scheduled',
  'published',
  'pinned',
  'archived',
  'open',
  'invite',
  'closed',
];
const ROLES = [
  { value: 'member', label: 'Member' },
  { value: 'staff', label: 'Staff' },
  { value: 'officer', label: 'Officer' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle level={2}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="gap-sp-16">{children}</CardContent>
    </Card>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return <p className="t-data text-brand">{children}</p>;
}

function Buttons() {
  return (
    <Section title="Buttons">
      <Button size="lg" className="w-full">
        Primary
      </Button>
      <Button size="lg" className="w-full border-brand-2 bg-brand-2">
        Pressed — brand/pressed
      </Button>
      <div className="grid grid-cols-2 gap-sp-8">
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex flex-wrap gap-sp-8">
        <Button size="sm">Approve</Button>
        <Button size="sm" variant="muted">
          Reject
        </Button>
        <Button size="sm" disabled>
          Disabled
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-sp-8">
        <Button variant="destructiveFill">
          <Trash2Icon /> Delete
        </Button>
        <Button variant="dashed">
          <PlusIcon /> Create
        </Button>
      </div>
      <Spec>Large 48 · default 44 · small 36 (44 touch) · radius/md</Spec>
    </Section>
  );
}

function Inputs() {
  return (
    <Section title="Inputs">
      <Field>
        <FieldLabel htmlFor="showcase-default">Default</FieldLabel>
        <Input id="showcase-default" placeholder="Placeholder" />
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-focused">Focused</FieldLabel>
        <Input
          id="showcase-focused"
          defaultValue="kaze.player@mail.com"
          className="border-brand ring-3 ring-focus"
        />
        <FieldDescription>border brand/default + overlay/focus-ring</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-valid">Valid</FieldLabel>
        <Input id="showcase-valid" defaultValue="EMBR" data-valid="true" />
        <FieldDescription className="flex items-center gap-sp-6 text-ok">
          <CheckIcon aria-hidden="true" className="size-sp-16" /> Available
        </FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="showcase-error">Error</FieldLabel>
        <Input id="showcase-error" defaultValue="5281 9047 331" aria-invalid />
        <FieldError>UID must be 12 digits.</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-disabled">
          Disabled <LockIcon aria-hidden="true" className="size-sp-12" />
        </FieldLabel>
        <Input id="showcase-disabled" defaultValue="Call of Duty: Mobile" disabled />
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-role">Select</FieldLabel>
        <Select items={ROLES} defaultValue="staff">
          <SelectTrigger id="showcase-role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLES.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-message">Textarea</FieldLabel>
        <Textarea id="showcase-message" placeholder="Tell the clan why you want to join" />
      </Field>
    </Section>
  );
}

function SelectionControls() {
  return (
    <Section title="Selection controls">
      <div className="flex flex-wrap items-center gap-sp-16">
        <Checkbox aria-label="Checked" defaultChecked />
        <Checkbox aria-label="Unchecked" />
        <RadioGroup aria-label="Radio" defaultValue="on" className="flex w-auto gap-sp-16">
          <RadioGroupItem value="on" aria-label="Selected" />
          <RadioGroupItem value="off" aria-label="Not selected" />
        </RadioGroup>
        <Switch aria-label="On" defaultChecked />
        <Switch aria-label="Off" />
      </div>
      <Tabs defaultValue="selected">
        <TabsList variant="segmented">
          <TabsTrigger value="selected">Selected</TabsTrigger>
          <TabsTrigger value="option-1">Option</TabsTrigger>
          <TabsTrigger value="option-2">Option</TabsTrigger>
        </TabsList>
      </Tabs>
      <Tabs defaultValue="all" className="-mx-card">
        <TabsList>
          <TabsTrigger value="all">
            All <span className="t-data text-mut">48</span>
          </TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="px-card t-caption text-mut">
          Underline section tabs, active tab in the URL.
        </TabsContent>
      </Tabs>
    </Section>
  );
}

function Badges() {
  return (
    <Section title="Status badges">
      <div className="flex flex-wrap gap-sp-6">
        {STATUS_BADGES.map((variant) => (
          <Badge key={variant} variant={variant} />
        ))}
      </div>
      <div className="flex flex-wrap gap-sp-6">
        {CONTENT_BADGES.map((variant) => (
          <Badge key={variant} variant={variant} />
        ))}
      </div>
      <Spec>Glyph + colour, never colour alone</Spec>
    </Section>
  );
}

function DataStates() {
  return (
    <Section title="Data states">
      <Card variant="sunk" role="status" aria-label="Loading members">
        <CardContent>
          <Skeleton className="h-sp-10 w-3/4" />
          <Skeleton className="h-sp-10 w-full" />
          <Skeleton className="h-sp-10 w-1/2" />
          <p className="t-label text-mut">Loading — skeleton, no spinner</p>
        </CardContent>
      </Card>
      <Card variant="dashed">
        <CardContent className="items-center text-center">
          <CardTitle level={3}>No applications yet</CardTitle>
          <CardDescription>Open recruitment or invite players directly by email.</CardDescription>
          <div className="flex gap-sp-8">
            <Button size="sm">Invite member</Button>
            <Button size="sm" variant="secondary">
              Open recruitment
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="flex items-center gap-sp-12">
        <Avatar>
          <AvatarFallback role="img" aria-label="Rhen_Valkyr" />
        </Avatar>
        <div className="flex-1">
          <p className="t-body-strong">Rhen_Valkyr</p>
          <p className="t-data text-mut">Clan Master · Mar 2026</p>
        </div>
        <Badge variant="active">Act</Badge>
      </div>
      <Separator />
      <AvatarGroup>
        {['RV', 'OV', 'RK'].map((initials) => (
          <Avatar key={initials}>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        ))}
        <AvatarGroupCount>+45</AvatarGroupCount>
      </AvatarGroup>
    </Section>
  );
}

function Overlays() {
  return (
    <Section title="Overlays">
      <div className="flex flex-wrap gap-sp-8">
        <Dialog>
          <DialogTrigger render={<Button variant="secondary" />}>Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite members</DialogTitle>
              <DialogDescription>Invites last 7 days.</DialogDescription>
            </DialogHeader>
            <DialogBody>
              <Field>
                <FieldLabel htmlFor="showcase-invite">Email addresses</FieldLabel>
                <Input id="showcase-invite" placeholder="player@example.com" />
              </Field>
            </DialogBody>
            <DialogFooter>
              <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
              <Button>Send invites</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>
            <MenuIcon /> Drawer
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Revenant Syndicate</SheetTitle>
            </SheetHeader>
            <SheetBody>
              <p className="t-body text-tx-2">Navigation drawer (M43).</p>
            </SheetBody>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger render={<Button variant="secondary" />}>Action sheet</SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Officer_Vex</SheetTitle>
            </SheetHeader>
            <SheetFooter>
              <Button variant="secondary" size="lg">
                Change role
              </Button>
              <Button variant="destructive" size="lg">
                Suspend member
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="secondary" />}>
            <EllipsisIcon /> Menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>Change role</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Suspend member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Tooltip>
          <TooltipTrigger render={<Button variant="secondary" />}>Tooltip</TooltipTrigger>
          <TooltipContent>3 new notifications</TooltipContent>
        </Tooltip>
        <Button variant="secondary" onClick={() => toast.success('Invitation sent to 2 players')}>
          Toast
        </Button>
      </div>
      <Spec>Below 768px dialogs open as bottom sheets</Spec>
    </Section>
  );
}

/** Every UI primitive in every variant, laid out like the Foundations frames (D45/M45). */
export function ComponentsShowcase() {
  return (
    <main className="mx-auto flex w-full max-w-frame flex-col gap-section px-gutter py-gutter">
      <header className="flex flex-col gap-sp-4">
        <p className="t-label text-mut">System</p>
        <h1 className="t-h2">Foundations &amp; components</h1>
      </header>
      <div className="grid items-start gap-section md:grid-cols-3">
        <div className="flex flex-col gap-section">
          <Buttons />
          <Badges />
        </div>
        <div className="flex flex-col gap-section">
          <Inputs />
        </div>
        <div className="flex flex-col gap-section">
          <SelectionControls />
          <DataStates />
          <Overlays />
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle level={2}>Where this lives</CardTitle>
          <CardAction>
            <Badge variant="pinned">Dev only</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="t-body text-tx-2">
            Components live in src/components/ui, each with a Storybook story and a test. This page
            returns 404 in production.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
